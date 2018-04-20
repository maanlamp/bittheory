import { loadImage } from "../Load.js";

class Offset {
	constructor (x = 0, y = 0) {
		this.x = Math.round(x);
		this.y = Math.round(y);
	}
}

export default class Sprite {
	constructor (url) {
		this.image = loadImage(url);
		this.name = url;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		this.spritesheet = null;
		this.finalised = false;
	}

	finalise (options) {
		delete this.image;
		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.spritesheet = options.spritesheet;
		this.finalised = true;
		this.offset = options.offset || new Offset(options.width / 2, options.height / 2);
	}
}