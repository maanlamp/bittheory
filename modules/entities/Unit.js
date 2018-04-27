import Entity from "./Entity.js";
import Vector2 from "../Vector2.js";

export default class Unit extends Entity {
	constructor (options) {
		super(options);
		this.sprite = options.sprite;
		this.spritesheetIndex = options.spritesheetIndex;
		this.layerIndex = options.layerIndex;
		this.direction = 0;
		this.selected = options.selected;
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
		const { x, y } = this.position;
		const [ ox, oy ] = [this.sprite.offset.x, this.sprite.offset.y];
		const [ sx, sy ] = [this.sprite.x, this.sprite.y];
		const { width, height } = this.sprite;
		const r = [this.sprite.width, this.sprite.height].avg()
		this.layer.canvas.context.save();
		this.layer.canvas.context.translate(x, y);
		this.layer.canvas.context.rotate(Vector2.radians(this.direction + 90));
		this.layer.canvas.context.drawImage(
			this.spritesheet.buffer,
			sx,
			sy,
			width,
			height,
			-ox,
			-oy,
			width,
			height
		);
		this.layer.canvas.context.restore();
		if (this.selected) {
			this.game.layers[0].canvas.context.beginPath();
			this.game.layers[0].canvas.context.arc(x, y, (width + height) / 3, 0, 359);
			this.game.layers[0].canvas.context.stroke();
		}
	}

	update (deltaTime) {
		super.update(deltaTime);
		this.direction += 2 * deltaTime * 60;
		this.position.add(Vector2.lenDir(2 * deltaTime * 60, this.direction));
	}
}