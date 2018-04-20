import Entity from "./Entity.js";
import Vector2 from "../Vector2.js";
import RendererShape from "../game/render/RenderShape.js";

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
		this.layer = game.renderer.layers[this.layerIndex];
		this.spritesheet = game.spritesheets[this.spritesheetIndex];
		delete this.spritesheetIndex;
		delete this.layerIndex;
		return this;
	}

	update (deltaTime) {
		super.update(deltaTime);
		this.direction += 2 * deltaTime * 60;
		this.position.add(Vector2.lenDir(deltaTime * 60, this.direction));
		this.game.renderer.enqueue(this);
	}
}