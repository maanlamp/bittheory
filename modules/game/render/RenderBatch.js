import Canvas from "../../Canvas.js";

export default class RenderBatch {
	constructor (options) {
		this.type = options.type;
		switch (this.type) {
			case "sprite":
				this.sprite = options.sprite;
				this.canvas = new Canvas({
					width: this.sprite.width,
					height: this.sprite.height
				});
				this.canvas.context.drawImage(
					this.sprite.spritesheet.buffer,
					this.sprite.x,
					this.sprite.y,
					this.sprite.width,
					this.sprite.height,
					0,
					0,
					this.sprite.width,
					this.sprite.height
				);
			break;
			default: throw new Error(`Batching of type "${this.type}" is not supported.`);
		}
		this.instructions = [];
	}

	instruct (instruction) {
		instruction.batch = this;
		this.instructions.push(instruction);
	}
}