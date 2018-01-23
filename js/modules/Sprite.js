class Spritesheet {
	constructor(sheet) {
		this.buffer = document.createElement("CANVAS");
		this.buffer.context = this.buffer.getContext("2d");
	}
}

export default class Sprite {
	constructor(sheet, x, y, w, h) {
		this.sheet = sheet;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.buffer = document.createElement("CANVAS");
		this.buffer.context = this.buffer.getContext("2d");
		this.buffer.width = this.w;
		this.buffer.height = this.h;
		this.buffer.context.drawImage(this.sheet, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h);
	}
}