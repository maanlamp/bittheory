import Vector2 from "../../Vector2.js";

export default class RenderInstruction {
	constructor (options) {
		this.layer = options.layer;
		this.x = options.x;
		this.y = options.y;
		this.direction = options.direction || 0;
		this.offset = options.sprite.offset || null;
		this.x2 = options.x2 || null;
		this.y2 = options.y2 || null;
		this.rotation = options.rotation || null;
	}

	execute () {
		//save context (maybe check if necessary?)
		this.layer.canvas.context.save();
		//execute draws
		this.layer.canvas.context.translate(this.x, this.y);
		this.layer.canvas.context.rotate(Vector2.radians(this.direction + 90));
		this.layer.canvas.context.drawImage(this.batch.canvas.buffer, -this.offset.x, -this.offset.y);
		//restore context
		this.layer.canvas.context.restore();
	}
}