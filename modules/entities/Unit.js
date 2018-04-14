import Entity from "./Entity.js";
import Vector2 from "../Vector2.js";

export default class Unit extends Entity {
	constructor (options) {
		super(options);
		this.sprite = options.sprite;
		this.spritesheetIndex = options.spritesheetIndex;
		this.layerIndex = options.layerIndex;
		this.direction = 0;
	}

	attach (game) {
		super.attach(game);
		this.layer = game.layers[this.layerIndex];
		this.layer.drawables.push(this);
		this.spritesheet = game.spritesheets[this.spritesheetIndex];
		delete this.spritesheetIndex;
		delete this.layerIndex;
		return this;
	}

	draw () {
		const px = this.position.x;
		const py = this.position.y;
		const ox = this.sprite.offset.x;
		const oy = this.sprite.offset.y;
		const sx = this.sprite.x;
		const sy = this.sprite.y;
		const w = this.sprite.width;
		const h = this.sprite.height;
		this.layer.canvas.context.save();
		this.layer.canvas.context.translate(px, py);
		this.layer.canvas.context.rotate(Vector2.radians(this.direction + 90));
		this.layer.canvas.context.drawImage(
			this.spritesheet.buffer,
			sx,
			sy,
			w,
			h,
			-ox,
			-oy,
			w,
			h
		);
		this.layer.canvas.context.restore();
	}

	update (deltaTime) {
		super.update(deltaTime);
		this.direction += 2 * deltaTime * 60;
		this.position.add(Vector2.lenDir(2 * deltaTime * 60, this.direction));
	}
}