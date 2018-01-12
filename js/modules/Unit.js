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
		if (to.constructor.name === "Number") {
			this.target = {position: new Vector2(Math.cos(to), Math.sin(to))}
		} else if (to.constructor.name === "Object") {
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
		this.context.rotate(Math.radians(this.direction));
		this.context.drawImage(this.sprite.sheet, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, -this.sprite.w / 2, -this.sprite.h / 2, this.sprite.w, this.sprite.h);
		this.context.restore();
		
		//Debug
		this.context.beginPath();
		this.context.moveTo(this.position.x, this.position.y);
		this.context.lineTo(this.target.position.x, this.target.position.y);
		this.context.stroke();
	}
	
	move() {
		this.position.lerp(this.target.position, 1/60);
	}
}