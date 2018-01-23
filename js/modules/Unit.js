import Vector2 from "./Vector2.js";

export default class Unit {
	constructor(x, y, sprite, layer, context) {
		this.context = context;
		this.position = new Vector2(x, y);
		this.sprite = sprite;
		this.target = {position: this.position.copy()};
		this.selected = false;
		this.selectionSize = Math.max(this.sprite.w, this.sprite.h) / 2;
		this.layer = layer;
		this.layer.objects.push(this);
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
		this.context.drawImage(this.sprite.buffer, -this.sprite.w/2, -this.sprite.h/2);
		this.context.restore();
		
		//Debug
		this.context.beginPath();
		this.context.moveTo(this.position.x, this.position.y);
		this.context.lineTo(this.target.position.x, this.target.position.y);
		this.context.stroke();
	}
	
	static setPosition(to, selectedUnits) {
		let i = selectedUnits.length;
		const count = i;
		if (selectedUnits instanceof Array) {
			while (i--) {
				const pos = Vector2.from(to);
				pos.add(Vector2.lenDir(count * 10, 360 / count * i));
				selectedUnits[i].target.position.set(pos);
			}
		} else if (selectedUnits instanceof Unit) {
			selectedUnits.target.position.set(to.x, to.y);
		} else {
			throw new Error(`Cannot edit target position of ${selectedUnits}: ${typeof selectedUnits} is not an Array or Unit`);
		}
	}
	
	move(deltaTime) {
		if (!this.position.rounded().equals(this.target.position.rounded())) {
			this.position.lerp(this.target.position, deltaTime);
		}
	}
}