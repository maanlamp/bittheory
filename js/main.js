import Vector2 from "./modules/Vector2.js";
function getMousePos(canvas, evt) {
	const rect = canvas.getBoundingClientRect(),
				scaleX = canvas.width / rect.width,
				scaleY = canvas.height / rect.height;
	return new Vector2((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY);
}

import Unit from "./modules/Unit.js";
import Sprite from "./modules/Sprite.js";
import {loadJSON, loadImage} from "./modules/Load.js";
import Layer from "./modules/Layer.js";
import Game from "./modules/Game.js";
import Camera from "./modules/Camera.js";
import Keybind from "./modules/Keybind.js";

const canvas = document.querySelector("#viewPort"),
			context = canvas.getContext("2d"),
			GAME = new Game();

//Setup game functions
function setup() {
	GAME.layers.push(new Layer(GAME.layers));
	return loadJSON("/data/sprites.json").then(json => {
		loadImage(`${json.location}/${json.sheets[0].name}`).then(spritesheet => {
			const sprites = json.sheets[0].sprites;
			let i = 10;
			while (i--) {
				GAME.add(new Unit(Math.random()*canvas.width, Math.random()*canvas.height, new Sprite(spritesheet, sprites[i%sprites.length].x, sprites[i%sprites.length].y, sprites[i%sprites.length].w, sprites[i%sprites.length].h), GAME.layers[0], context));
			}
		});
	});
}

let deltaTime = 1/60,
		lastTime = 0;
context.fillStyle = "#212135";
context.strokeStyle = "limeGreen";
function update(currentTime) {
	deltaTime = (currentTime - lastTime) / 1000;
	
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if (!GAME.camera.position.equals(GAME.camera.target)) {
		GAME.camera.position.lerp(GAME.camera.target, 1/10);
		context.translate(GAME.camera.position.x, GAME.camera.position.y);
	}
	
	let i = GAME.layers.length,
			ii = GAME.units.length;
	while (i--) {
		ii = GAME.layers[i].objects.length;
		while (ii--) {
			GAME.layers[i].objects[ii].draw();
			GAME.layers[i].objects[ii].move(deltaTime);
		}
	}
	
	const prevfill = context.fillStyle;
	context.font = "18px 'Fira Mono', monospace";
	context.fillStyle = "white";
	context.fillText(`Closed alpha programme - Version ${GAME.version}`, 10, 28);
	context.fillText(`fps: ${fps}/60`, 10, 48);
	context.fillStyle = prevfill;
	
	if (GAME.selection.active) {
		const x = GAME.selection.start.x - GAME.camera.position.x,
					y = GAME.selection.start.y - GAME.camera.position.y;
		context.strokeRect(x, y, GAME.selection.w, GAME.selection.h);
	}
	
	requestAnimationFrame(update);
	lastTime = currentTime;
}

let fps = 0;
function updateFPS() {
	fps = Math.round(1 / deltaTime);
	setTimeout(updateFPS, 1000/4);
}
updateFPS();

window.addEventListener("mousedown", event => {
	if (event.button == 2) {
		const units = GAME.selectedUnits,
					pos = getMousePos(canvas, event);
		Unit.setPosition(pos, units);
	} else {
		const pos = getMousePos(canvas, event);
		GAME.selection.active = true;
		GAME.selection.reset(pos);
		GAME.selection.update(pos);
	}
});
window.addEventListener("mousemove", event => {
	if (event.button == 2) return;
	if (event.buttons) {
		const pos = getMousePos(canvas, event);
		GAME.selection.update(pos);
	}
});
window.addEventListener("mouseup", event => {
	if (event.button == 2) return;
	GAME.selection.active = false;
	const allUnits = GAME.units,
				unitsToSelect = GAME.unitsInsideSelection;
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

const keybinds = new Map(),
			keystate = new Map();
GAME.camera = new Camera();
keybinds.set("w", new Keybind(
	() => {
		GAME.camera.target.add(0, 10);
	},
	() => {
		GAME.camera.target.subtract(0, 10);
	}
));
keybinds.set("a", new Keybind(
	() => {
		GAME.camera.target.add(10, 0);
	},
	() => {
		GAME.camera.target.subtract(10, 0);
	}
));
keybinds.set("s", new Keybind(
	() => {
		GAME.camera.target.subtract(0, 10);
	},
	() => {
		GAME.camera.target.add(0, 10);
	}
));
keybinds.set("d", new Keybind(
	() => {
		GAME.camera.target.subtract(10, 0);
	},
	() => {
		GAME.camera.target.add(10, 0);
	}
));

const PRESSED = true,
			RELEASED = false;
for (let [key, value] of keybinds) {
	keystate.set(key, RELEASED);
}
window.addEventListener("keydown", event => {
	for (let [key, value] of keybinds) {
		if (event.key === key && keystate.get(key) === RELEASED) {
			keystate.set(event.key, PRESSED);
			value.pressed();
		}
	}
});
window.addEventListener("keyup", event => {
	event.preventDefault();
	event.preventDefault();
	for (let [key, value] of keybinds) {
		if (event.key === key) {
			keystate.set(event.key, RELEASED);
			value.released();
		}
	}
});

//Actual game
setup()
update();
console.log(GAME);