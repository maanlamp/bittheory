import Vector2 from "../Vector2.js";

export default class Entity {
	constructor (args) {
		this.position = Vector2.from(args.position || [0, 0]);
		this.game = undefined;
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