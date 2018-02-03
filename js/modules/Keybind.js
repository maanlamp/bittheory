export class Keybind {
	constructor(pressed, released) {
		this.pressed = pressed;
		this.released = released;
	}
}

export function initialiseKeybinds(keybinds, keystate, game) {
	keybinds.set("w", new Keybind(
		() => {
			game.camera.target.add(0, 10);
		},
		() => {
			game.camera.target.subtract(0, 10);
		}
	));
	keybinds.set("a", new Keybind(
		() => {
			game.camera.target.add(10, 0);
		},
		() => {
			game.camera.target.subtract(10, 0);
		}
	));
	keybinds.set("s", new Keybind(
		() => {
			game.camera.target.subtract(0, 10);
		},
		() => {
			game.camera.target.add(0, 10);
		}
	));
	keybinds.set("d", new Keybind(
		() => {
			game.camera.target.subtract(10, 0);
		},
		() => {
			game.camera.target.add(10, 0);
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
		for (let [key, value] of keybinds) {
			if (event.key === key) {
				keystate.set(event.key, RELEASED);
				value.released();
			}
		}
	});
}