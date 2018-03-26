import {loadImage} from "../Load.js";

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
		this.finalised = false;
	}

	finalise (x, y, width, height) {
		delete this.image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.finalised = true;
		this.offset = new Offset(width / 2, height / 2);
	}
}