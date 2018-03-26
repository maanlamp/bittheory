import Sprite from "./Sprite.js";

export default class Spritesheet {
	constructor () {
		this.sprites = [];
		this.buffer = document.createElement("CANVAS");
		this.context = this.buffer.getContext("2d");
		this.padding = 1;
	}

	define (sprite) {
		return new Promise((resolve, reject) => {
			sprite.image.then(image => {
				const x = this.sprites.reduce((totalWidth, sprite) => totalWidth += sprite.width + this.padding, 0);
				const y = 0;
				const temp = this.context.getImageData(0, 0, this.buffer.width, this.buffer.height);
				this.buffer.width = x + image.width;
				this.buffer.height = Math.max(this.buffer.height, image.height);
				this.context.putImageData(temp, 0, 0);
				this.context.drawImage(image, x, y);
				this.sprites.push(sprite);
				sprite.finalise(x, y, image.width, image.height);
				resolve(sprite);
			});
		});
	}

	get (name) {
		const result = this.sprites.find(sprite => sprite.name.includes(name));
		if (result) {
			return result;
		} else {
			throw new Error(`No defined sprite name includes "${name}".`);
		}
	}
}