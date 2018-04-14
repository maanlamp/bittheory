import Time from "./Time.js";
import Layer from "./Layer.js";
import Spritesheet from "../sprite/Spritesheet.js";
import Unit from "../entities/Unit.js";
import Entity from "../entities/Entity.js";
import Canvas from "../Canvas.js";
import Mouse from "./Mouse.js"

export default class Game {
	constructor (options) {
		this.time = options.time || new Time();
		this.spritesheets = options.spritesheets || [new Spritesheet()];
		this.entities = options.entities || [];
		this.viewport = options.viewport || new Canvas({
			width: window.innerWidth,
			height: window.innerHeight,
			parent: window
		});
		const body = document.body;
		body.insertBefore(this.viewport.buffer, body.firstChild);
		this.layers = options.layers || [new Layer(this), new Layer(this), new Layer(this)];
		this.version = options.version;
		this._FPS = [];
		this.mouse = options.mouse || new Mouse();
	}

	set fpsSmoothing (smoothing) {
		this._FPS.length = 0;
		let i = Math.round(60 * smoothing);
		while (i--) {
			this._FPS.push(this.fps);
		}
	}

	get fps () {
		this._FPS.shift();
		this._FPS.push(Math.floor(1 / this.time.delta));
		const total = this._FPS.reduce((totalFps, fps) => totalFps += fps);
		const average = Math.floor(total / this._FPS.length);
		return average;
	}

	add (type, options) {
		switch (type.toUpperCase()) {
			case "ENTITY":
				return new Entity(options).attach(this);
			case "UNIT":
				return new Unit(options).attach(this);
			default:
				throw new Error(`Adding a ${type} is not supported.`);
		}
	}
}