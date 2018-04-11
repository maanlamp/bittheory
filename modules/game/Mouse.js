export default class Mouse {
	constructor () {
		this.reset();

		["mouseenter", "mousemove"].forEach(eventName => {
			document.addEventListener(eventName, event => {
				this.update(event);
			});
		});

		document.addEventListener("mouseleave", event => {
			this.reset(event);
		});

		document.addEventListener("mouseup", event => {
			this.mouseup(event);
		});

		document.addEventListener("mousedown", event => {
			this.mousedown(event);
		});
	}

	mouseup (event) {
		this.prevX = null;
		this.prevY = null;
	}

	mousedown (event) {
		this.prevX = this.x;
		this.prevY = this.y;
	}

	update (event) {
		this.x = event.clientX;
		this.y = event.clientY;
	}

	reset (event) {
		this.x = null;
		this.y = null;
		this.prevX = null;
		this.prevY = null;
	}
}