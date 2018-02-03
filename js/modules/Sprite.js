import Vector2 from "./Vector2.js";

export class Spritesheet {
	constructor() {
		this.buffer = document.createElement("CANVAS");
		this.buffer.width = 1;
		this.buffer.height = 1;
		this.context = this.buffer.getContext("2d");
		this.existingSprites = [];
		this.padding = 1;
	}
	
	define(bufferSprite) {
		//find a place for the sprite to fit onto the sheet
		let x = 0, y = 0;
		this.existingSprites.forEach(sprite => {
			x += sprite.width + this.padding + 1;
		});
		bufferSprite.x = x;
		bufferSprite.y = y;
		
		//Save the sheet, then resize and redraw it
		const temp = this.context.getImageData(0, 0, this.buffer.width, this.buffer.height);
		this.buffer.width = Math.max(this.buffer.width, x + bufferSprite.width + this.padding + 1);
		this.buffer.height = Math.max(this.buffer.height, bufferSprite.height);
		this.context.putImageData(temp, 0, 0);
		
		//Draw the new image and push it into existence
		this.context.drawImage(bufferSprite.img, x, y);
		this.existingSprites.push(new Sprite(bufferSprite.name, bufferSprite.x, bufferSprite.y, bufferSprite.width, bufferSprite.height, bufferSprite.offset, bufferSprite.exhausts));
	}
	
	get(name) {
		let i = this.existingSprites.length;
		while (i--) {
			if (this.existingSprites[i].name.includes(name)) {
				return this.existingSprites[i];
			}
		}
		throw new Error(`No defined sprite with name: ${name}`);
	}
}

class Sprite {
	constructor(name, x, y, w, h, offset, exhausts) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.offset = offset;
		this.exhausts = exhausts;
	}
}

export class BufferSprite {
	constructor(img, name, offset, exhausts) {
		this.img = img;
		this.name = img.src;
		this.x = 0;
		this.y = 0;
		this.width = this.img.width;
		this.height = this.img.height;
		this.offset = offset;
		this.exhausts = exhausts;
	}
}