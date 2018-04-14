class IncompleteSavedContext {
	constructor (parent) {
		this._PARENT = parent;
	}
}

export default class Canvas {
	constructor (width = 16, height = 16, parent = null) {
		this.buffer = document.createElement("CANVAS");
		this.buffer.width = width;
		this.buffer.height = height;
		this.context = this.buffer.getContext("2d");
		this.parent = parent;
		this._SAVEDCONTEXT = new IncompleteSavedContext(this);
		try {
			//When supported, set parent to other Canvases instead of window
			this.parent.addEventListener("resize", event => {
				this.resizeTo(this.parent);
			});
		} catch (err) {
			let type = (typeof parent).capitalise();
			throw new Error(`Cannot add event listener to [${type} ${parent}].`);
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