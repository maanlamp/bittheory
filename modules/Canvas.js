export default class Canvas {
	constructor (width = 16, height = 16, parent = null) {
		this.buffer = document.createElement("CANVAS");
		this.buffer.width = width;
		this.buffer.height = height;
		this.context = this.buffer.getContext("2d");
		this.parent = parent;
		try {
			//When supported, set parent to other Canvases instead of window
			this.parent.addEventListener("resize", event => {
				this.resizeTo(this.parent);
			});
		} catch (err) {
			let type = (typeof parent);
			type = type[0].toUpperCase() + type.slice(1);
			throw new Error(`Cannot add event listener to [${type} ${parent}].`);
		}
	}

	resizeTo (parentOrWidth, height) {
		this.context.save();
		if (parentOrWidth instanceof Number) {
			this.width = parentOrWidth;
			this.height = height;
		} else if (parentOrWidth instanceof Object) {
			this.width = parentOrWidth.width || parentOrWidth.innerWidth;
			this.height = parentOrWidth.height || parentOrWidth.innerHeight;
		}
		this.context.restore();
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