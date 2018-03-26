export default class Canvas {
	constructor (width = 16, height = 16) {
		this.buffer = document.createElement("CANVAS");
		this.buffer.width = width;
		this.buffer.height = height;
		this.context = this.buffer.getContext("2d");
	}

	get width () {
		return this.buffer.width;
	}

	set width (width) {
		this.buffer.width = width;
	}

	get height () {
		return this.buffer.height;
	}

	set height (height) {
		this.buffer.height = height;
	}
}