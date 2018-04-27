import { loadJSON, loadImage } from "./modules/Load.js";
import Game from "./modules/game/Game.js";
import Sprite from "./modules/sprite/Sprite.js";
import Spritesheet from "./modules/sprite/Spritesheet.js";

const GAME = new Game({
	version: "5.1.0"
});
window.Game = GAME;

//Game functions
function setup (game) {
	return new Promise((resolve, reject) => {
		Promise.all([
			game.spritesheets[0].define(new Sprite("images/ships/human/commander.png")),
			game.spritesheets[0].define(new Sprite("images/ships/human/grunt1.png")),
			game.spritesheets[0].define(new Sprite("images/ships/human/grunt2.png")),
			game.spritesheets[0].define(new Sprite("images/ships/human/grunt3.png")),
			game.spritesheets[0].define(new Sprite("images/ships/human/grunt4.png")),
			game.spritesheets[0].define(new Sprite("images/ships/alien/commander.png")),
			game.spritesheets[0].define(new Sprite("images/ships/alien/grunt1.png")),
			game.spritesheets[0].define(new Sprite("images/ships/alien/grunt2.png")),
			game.spritesheets[0].define(new Sprite("images/ships/alien/grunt3.png"))
		]).then(sprites => {
			resolve(game);
		});
	});
}

//Let renderer do drawing and requesting animation frames
function update (game) {
	const deltaTime = game.time.delta;

	for (const entity of game.entities) {
		entity.update(deltaTime);
	}

	game.viewport.context.fillRect(0, 0, game.viewport.width, game.viewport.height);
	for (const layer of game.layers) {
		for (const drawable of layer.drawables) {
			drawable.draw();
		}
		layer.draw();
	}

	//refine later
	if (game.mouse.prevX) {
		game.layers[2].canvas.context.strokeRect(game.mouse.prevX, game.mouse.prevY, game.mouse.x - game.mouse.prevX, game.mouse.y - game.mouse.prevY);
	}
	//debug
	game.layers[2].canvas.context.fillText(`${game.fps} fps`, 10, 20);

	requestAnimationFrame(timestamp => {
		game.time.update(timestamp);
		update(game);
	});
}

//Game logic
setup(GAME).then(game => {
	console.log(`Bit Theory closed alpha programme v${game.version}\n`, game);
	game.fpsSmoothing = .25;
	game.viewport.context.fillStyle = "rgb(20, 20, 30)";
	game.layers.forEach(layer => {
		layer.canvas.context.fillStyle = "limeGreen";
		layer.canvas.context.strokeStyle = "limeGreen";
		layer.canvas.context.font = "18px Fira Mono";
	});
	let i = 10;
	while (i--) {
		game.add("unit", {
			position: [
				100 + Math.floor(Math.random() * game.viewport.width - 200),
				100 + Math.floor(Math.random() * game.viewport.height - 200)
			],
			layerIndex: 1,
			spritesheetIndex: 0,
			sprite: game.spritesheets[0].get(
				game.spritesheets[0].sprites[
					Math.floor(
						Math.random() * game.spritesheets[0].sprites.length
					)
				].name
			),
			selected: !!Math.round(Math.random())
		});
	}
	update(game);
});