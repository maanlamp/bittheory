import Vector2 from "../Vector2.js";
import id from "../Identifier.js";

export default class Entity {
	constructor (options) {
		this.position = Vector2.from(options.position || [0, 0]);
		this.game = null;
		this.id = options.id || id({ length: 16 });
	}

	attach (game) {
		this.game = game;
		this.game.entities.push(this);
		return this;
	}

	update (deltaTime) {
		//
	}
}