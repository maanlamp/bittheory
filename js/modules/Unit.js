import Vector2 from "./Vector2.js";

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
	
	get context() {
		return this.game.context;;
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
		
		//Debug
		if (!this.position.fuzzyEquals(this.target.position)) {
			this.context.beginPath();
			this.context.moveTo(this.position.x, this.position.y);
			this.context.lineTo(this.target.position.x, this.target.position.y);
			this.context.stroke();
		}
	}
	
	static setPosition(to, selectedUnits) {
		let i = selectedUnits.length;
		const count = i;
		if (count > 1) {
			while (i--) {
				const pos = Vector2.from(to);
				pos.add(Vector2.lenDir(count * 10, 360 / count * i));
				selectedUnits[i].target.position.set(pos);
			}
		} else {
			selectedUnits[0].target.position.set(to.x, to.y);
		}
	}
	
	move(deltaTime) {
		if (!this.position.fuzzyEquals(this.target.position)) {
			this.position.interpolate(this.target.position, deltaTime);
			this.spawnParticle(deltaTime);
		}
	}
	
	spawnParticle(deltaTime) {
		//
	}
	
	update(deltaTime) {
		this.move(deltaTime);
		this.draw();
	}
}