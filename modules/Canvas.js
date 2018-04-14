class IncompleteSavedContext {
	constructor (parent) {
		this._PARENT = parent;
	}
}

export default class Canvas {
	constructor (options) {
		this.buffer = document.createElement("CANVAS");
		this.context = this.buffer.getContext("2d");
		this._SAVEDCONTEXT = new IncompleteSavedContext(this);
		this.buffer.width = options.width || 16;
		this.buffer.height = options.height || 16;
		this.parent = options.parent || null;
		try {
			//When supported, set parent to other Canvases instead of window
			this.parent.addEventListener("resize", event => {
				this.resizeTo(this.parent);
			});
		} catch (err) {
			let type = (typeof parent).capitalise();
			throw new Error(`Cannot add event listener to [${type} ${this.parent}].`);
		}
	}

	save () {
		for (const property in this.context) {
			const value = this.context[property];
			if (typeof value === "string" || typeof value === "number") {
				this._SAVEDCONTEXT[property] = value;
			}
		}
	}

	restore () {
		Object.assign(this.context, this._SAVEDCONTEXT);
	}

	resizeTo (parentOrWidth, height) {
		this.save();
		if (parentOrWidth instanceof Number) {
			this.width = parentOrWidth;
			this.height = height;
		} else if (parentOrWidth instanceof Object) {
			this.width = parentOrWidth.width || parentOrWidth.innerWidth;
			this.height = parentOrWidth.height || parentOrWidth.innerHeight;
		}
		this.restore();
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