import Time from "./Time.js";
import Layer from "./Layer.js";
import Spritesheet from "../sprite/Spritesheet.js";
import Unit from "../entities/Unit.js";
import Entity from "../entities/Entity.js";
import Canvas from "../Canvas.js";
import Mouse from "./Mouse.js"

export default class Game {
	constructor (canvas) {
		this.time = new Time();
		this.spritesheets = [new Spritesheet()];
		this.entities = [];
		this.viewport = new Canvas(window.innerWidth, window.innerHeight, window);
		const body = document.body;
		body.insertBefore(this.viewport.buffer, body.firstChild);
		this.layers = [new Layer(this), new Layer(this), new Layer(this)];
		this.version = "5.0.1";
		this._FPS = [];
		this.mouse = new Mouse();
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

	add (type, args) {
		switch (type.toUpperCase()) {
			case "ENTITY":
				return new Entity(args).attach(this);
			case "UNIT":
				return new Unit(args).attach(this);
			default:
				throw new Error(`Adding a ${type} is not supported.`);
		}
	}
}