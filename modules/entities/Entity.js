import Vector2 from "../Vector2.js";

export default class Entity {
	constructor (options) {
		this.position = Vector2.from(options.position || [0, 0]);
		this.game = null;
	}

	get x () {
		return this.position.x;
	}

	get y () {
		return this.position.y;
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