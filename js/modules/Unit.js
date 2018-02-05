import Vector2 from "./Vector2.js";
import Particle from "./Particle.js";

export default class Unit {
	constructor(x, y, sheet, spriteName) {
		this.position = new Vector2(x, y);
		this.sheet = sheet;
		this.sprite = this.sheet.get(spriteName);
		this.target = {position: new Vector2(x, y-.00001)};
		this.selected = false;
		this.selectionSize = Math.max(this.sprite.width, this.sprite.height) / 2;
		this.layer = null;
		this.game = null;
	}
	
	get isOnscreen() {
		return (
			this.position.x > 0 &&
			this.position.y > 0 &&
			this.position.x < this.game.canvas.width &&
			this.position.y < this.game.canvas.height
		);
	}
	
	get faction() {
		return this.sprite.name.match(/(alien)|(human)/g)[0];
	}
	
	get context() {
		return this.game.context;
	}
	
	select() {
		this.selected = true;
	}
	
	deselect() {
		this.selected = false;
	}
	
	isInsideSelection(selection) {
		const tlbr = (this.x>selection.start.x && this.x<selection.end.x && this.y>selection.start.y && this.y<selection.end.y),
					bltr = (this.x>selection.start.x && this.x<selection.end.x && this.y<selection.start.y && this.y>selection.end.y),
					brtl = (this.x<selection.start.x && this.x>selection.end.x && this.y<selection.start.y && this.y>selection.end.y),
					trbl = (this.x<selection.start.x && this.x>selection.end.x && this.y>selection.start.y && this.y<selection.end.y);
		return (tlbr || bltr || brtl || trbl);
	}
	
	get isOnScreen() {
		return true;
	}
	
	get x() {
		return this.position.x;
	}
	
	set x(x) {
		this.position.x = x;
	}
	
	get y() {
		return this.position.y;
	}
	
	set y(y) {
		this.position.x = y;
	}
	
	get direction() {
		return this.position.angle(this.target.position);
	}
	
	set direction(to) {
		if (to instanceof Number) {
			this.target = {position: new Vector2(Math.cos(to), Math.sin(to))}
		} else if (to instanceof Object) {
			if (isNaN(to.angle)) {
				throw new Error(`"${to.constructor.name}: ${to}" is missing an angle property`);
			}
			if (!to.mode) {
				throw new Error(`"${to.constructor.name}: ${to}" is missing a mode property`);
			}
			let angleToSet = to.angle;
			angleToSet = (to.mode.includes("deg")) ? angleToSet * Math.PI / 180 : angleToSet;
			this.target = {position: new Vector2(this.position.x + Math.cos(angleToSet), this.position.y + Math.sin(angleToSet))}
		} else {
			throw new Error(`Cannot assign "${to.constructor.name}: ${to}" as an angle`);
		}
	}
	
	draw() {
		if (!this.isOnscreen) {
			return false;
		}
		//Debug
		if (!this.position.fuzzyEquals(this.target.position)) {
			this.context.beginPath();
			const pos = this.position.added(Vector2.lenDir(this.selectionSize, this.direction - 90));
			this.context.moveTo(pos.x, pos.y);
			this.context.lineTo(this.target.position.x, this.target.position.y);
			this.context.stroke();
		}
		
		if (this.selected) {
			this.context.beginPath();
			this.context.ellipse(this.position.x, this.position.y, this.selectionSize, this.selectionSize, 0, 0, Math.PI * 2);
			this.context.stroke();
		}
		this.context.save();
		this.context.translate(this.position.x, this.position.y);
		this.context.rotate(Vector2.radians(this.direction));
		this.context.drawImage(this.sheet.buffer, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, -this.sprite.offset.x, -this.sprite.offset.y, this.sprite.width, this.sprite.height);
		this.context.restore();
	}
	
	static setPosition(to, selectedUnits, size) {
		if (selectedUnits[0] == undefined) {
			return;
		}
		let i = selectedUnits.length;
		const count = i,
					avg = ((selectedUnits[0].sprite.width + selectedUnits[0].sprite.height) / 2) / i;
		size = (size > avg) ? size : avg;
		if (count > 1) {
			while (i--) {
				const pos = Vector2.from(to);
				pos.add(Vector2.lenDir(size, 360 / count * i - 90));
				selectedUnits[i].target.position.set(pos);
			}
		} else {
			selectedUnits[0].target.position.set(to.x, to.y);
		}
	}
	
	move(deltaTime) {
		this.position.interpolate(this.target.position, deltaTime);
	}
	
	spawnParticle(deltaTime) {
		if (this.game.particles.length >= this.game.maxParticles) {
			return;
		}
		let i = this.sprite.exhausts.length;
		while (i--) {
			const exhaust = this.sprite.exhausts[i];
			this.game.add(
				new Particle(
					this.position.subtracted(
						Vector2.lenDir(
							exhaust.len,
							exhaust.dir + 90 + this.direction
						)
					),
					this.game.spritesheets[0],
					`particles/${this.faction}`,
					this.direction + 180,
					0,
					25000 * deltaTime
				),
				this.game.layers[1]
			);
		}
	}
	
	update(deltaTime) {
		this.draw();
		if (!this.position.fuzzyEquals(this.target.position)) {
			this.move(deltaTime);
			if (this.isOnscreen) {
				this.spawnParticle(deltaTime);
			}
		}
	}
}