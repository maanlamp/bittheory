import Vector2 from "./Vector2.js";
import Unit from "./Unit.js";
import Particle from "./Particle.js";

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

export class Game {
	constructor() {
		this.layers = [];
		this.units = [];
		this.particles = [];
		this.spritesheets = [];
		this.selection = new Selection();
		this.version = 0.3;
	}
	
	add(object, layer) {
		if (object instanceof Unit) {
			this.units.push(object);
		} else if (object instanceof Particle) {
			this.particles.push(object);
		}
		layer.objects.push(object);
		object.layer = layer;
		object.game = this;
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

export function initialiseMousebinds(game) {
	function getMousePos(canvas, evt) {
		const rect = canvas.getBoundingClientRect(),
					scaleX = canvas.width / rect.width,
					scaleY = canvas.height / rect.height;
		return new Vector2((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
	}
	window.addEventListener("mousedown", event => {
		if (event.button == 2) {
			const units = game.selectedUnits,
						pos = getMousePos(game.canvas, event);
			Unit.setPosition(pos, units);
		} else {
			const pos = getMousePos(game.canvas, event);
			game.selection.active = true;
			game.selection.reset(pos);
			game.selection.update(pos);
		}
	});
	window.addEventListener("mousemove", event => {
		if (event.button == 2) return;
		if (event.buttons) {
			const pos = getMousePos(game.canvas, event);
			game.selection.update(pos);
		}
	});
	window.addEventListener("mouseup", event => {
		if (event.button == 2) return;
		game.selection.active = false;
		const allUnits = game.units,
					unitsToSelect = game.unitsInsideSelection;
		let 	i = allUnits.length,
					ii = unitsToSelect.length;
		if (!(event.ctrlKey || event.altKey)) {
			while(i--) {
				allUnits[i].deselect();
			}
		}
		while(ii--) {
			if (event.altKey) {
				unitsToSelect[ii].deselect();
			} else {
				unitsToSelect[ii].select();
			}
		}
	});
	window.addEventListener("contextmenu", event => {
		event.preventDefault();
	});
}