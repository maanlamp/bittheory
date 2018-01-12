import Vector2 from "./Vector2.js";

class Selection {
	constructor() {
		this.active = false;
		this.start = new Vector2(0, 0);
		this.end = new Vector2(0, 0);
		this.w = 0;
		this.h = 0;
	}
	
	reset(pos) {
		this.start = pos;
		this.end.set(0);
	}
	
	update(pos) {
		this.end.set(pos);
		this.w = pos.subtracted(this.start).x;
		this.h = pos.subtracted(this.start).y;
	}
}

export default class Game {
	constructor() {
		this.layers = [];
		this.units = [];
		this.selection = new Selection();
		this.version = 0.1;
	}
	
	add(object) {
		this.units.push(object);
	}
	
	get unitsInsideSelection() {
		let i = this.units.length,
				returnArray = [];
		while (i--) {
			let unit = this.units[i];
			if (unit.isInsideSelection(this.selection)) {
				returnArray.push(unit);
			}
		}
		return returnArray;
	}
	
	get selectedUnits() {
		let i = this.units.length,
				returnArray = [];
		while (i--) {
			let unit = this.units[i];
			if (unit.selected) {
				returnArray.push(unit);
			}
		}
		return returnArray;
	}
}