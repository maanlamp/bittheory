/*
Before every frame, let all objects add their sprite or shape to a renderbatch like so:
Renderer.enqueue("sprite", {
	x: this.x,
	y: this.y,
	...
});
*/
class RenderBatch {
	constructor (options) {
		this.type = options.type;
		this.instructions = [];
	}

	add (instruction) {
		this.instructions.push(instruction);
	}
}

class RenderInstruction {
	constructor (batch, options) {
		this.batch = batch;
		this.x = options.x;
		this.y = options.y;
		this.x2 = options.x2 || null;
		this.y2 = options.y2 || null;
		this.rotation = options.rotation || null;
	}

	execute () {
		//
	}
}

//Maybe rework spritesheeting to only have one method
//that either loads a sprite, defines it and then returns it,
//or just returns it if it already exists.

export default class Renderer {
	constructor (options) {
		this.layers = options.layers;
		this.queue = [];
	}

	static enqueue (type, options) {
		//Check if there is already a RenderBatch with the same type > Do deeper checking if required.
		//If no to any, create new RenderBatch
		//Then RenderBatch.add(instruction);
	}

	clear () {
		this.queue.length = 0;
	}

	render () {
		this.queue.forEach(renderBatch => {
			renderBatch.instructions.forEach(instruction => {
				instruction.execute();
			});
		});
	}
}