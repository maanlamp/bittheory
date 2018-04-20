import RenderBatch from "./RenderBatch.js";
import RenderInstruction from "./RenderInstruction.js";
import RenderShape from "./RenderShape.js";

/*
Before every frame, let all objects add their sprite or shape to a renderbatch like so:
Renderer.enqueue(object);
where object is either a game unit or a RenderShape();
*/

//Maybe rework spritesheeting to only have one method
//that either loads a sprite, defines it and then returns it,
//or just returns it if it already exists.

export default class Renderer {
	constructor (options) {
		this.layers = options.layers;
		this.game = options.game;
		this.queue = [];
	}

	static Shape (options) {
		switch (options.type) {
			case "square":
			break;
			default: throw new Error(`Unknown shape ${type}.`);
		}
	}

	queueContainsBatchFor (object) {
		const type = object.sprite ? "sprite" : "shape";
		let matches = this.queue.filter(batch => batch.type === type);
		if (matches.length) {
			return matches.find(batch => batch.sprite.name === object.sprite.name);
		} else {
			return null;
		}
	}

	enqueue (object) {
		//Check if there is already a RenderBatch with the same type > Do deeper checking if required.
		//If no to any, create new RenderBatch
		//Then RenderBatch.add(instruction);
		//verander spritename naar renderbatch type
		//MAKE INSTRUCTION-AGNOSTIC!!!
		let batch = this.queueContainsBatchFor(object);
		if (!batch) {
			batch = new RenderBatch({
				type: "sprite",
				sprite: object.sprite
			});
			this.queue.push(batch);
		}
		batch.instruct(new RenderInstruction(object));
	}

	render () {
		//clear screen
		this.game.canvas.context.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
		//Only draw everything in queue at this moment and discard everything else
		const queue = this.queue.copy();
		this.queue.clear();
		//Execute RenderInstructions
		queue.forEach(renderBatch => {
			renderBatch.instructions.forEach(instruction => {
				instruction.execute();
			});
		});
		//Draw to layers
		for (const layer of this.layers) {
			this.game.canvas.context.drawImage(layer.canvas.buffer, 0, 0);
			layer.canvas.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
		}
	}
}