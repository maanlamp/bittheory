import Vector2 from "./modules/Vector2.js";
import Unit from "./modules/Unit.js";
import {Spritesheet, BufferSprite} from "./modules/Sprite.js";
import {loadJSON, loadImage} from "./modules/Load.js";
import Layer from "./modules/Layer.js";
import {Game, initialiseMousebinds} from "./modules/Game.js";
import Camera from "./modules/Camera.js";
import {Keybind, initialiseKeybinds} from "./modules/Keybind.js";

const GAME = new Game();
GAME.canvas = document.querySelector("#viewPort");
GAME.context = GAME.canvas.getContext("2d");
GAME.context.imageSmoothingEnabled = true;
GAME.context.imageSmoothingQuality = "high";

//Setup game functions
function setup() {
	return new Promise(resolve => {
		let promises = [],
				sprites = [];
		function loadSprite(path, folder, sprite) {
			promises.push(loadImage(path));
			const temp = sprite;
			temp.name = `${folder.name}/${sprite.name}`;
			sprites.push(temp);
		}
		GAME.layers.push(new Layer(GAME));
		GAME.layers.push(new Layer(GAME));
		GAME.spritesheets.push(new Spritesheet());
		loadJSON("/data/sprites.json").then(json => {
			json.folders.forEach(folder => {
				if (folder.sprites) { //Particles
					folder.sprites.forEach(sprite => {
						loadSprite(`${json.name}/${folder.name}/${sprite.name}.png`, folder, sprite);
					});
				} else { //Ships
					folder.folders.forEach(folder => {
						folder.sprites.forEach(sprite => {
							loadSprite(`${json.name}/ships/${folder.name}/${sprite.name}.png`, folder, sprite);
						});
					});
				}
			});
			Promise.all(promises).then(resolvedPromises => {
				resolvedPromises.forEach(image => {
					let i = sprites.length;
					while (i--) {
						if (image.src.includes(sprites[i].name)) {
							GAME.spritesheets[0].define(new BufferSprite(image, image.src, sprites[i].offset, sprites[i].exhausts));
						}
					}
				});
				resolve(GAME);
			});
		});
	});
}

let deltaTime = 1/60,
		lastTime = 0;
GAME.context.fillStyle = "#212135";
GAME.context.strokeStyle = "limeGreen";
function update(currentTime) {
	deltaTime = (currentTime - lastTime) / 1000;
	
	GAME.context.fillRect(0, 0, GAME.canvas.width, GAME.canvas.height);
	
	if (!GAME.camera.position.fuzzyEquals(GAME.camera.target)) {
		GAME.camera.position.interpolate(GAME.camera.target, 1/10);
		GAME.context.translate(GAME.camera.position.x, GAME.camera.position.y);
	}
	
	let i = GAME.layers.length,
			ii = GAME.layers[i - 1].objects.length;
	while (i--) {
		ii = GAME.layers[i].objects.length;
		while (ii--) {
			GAME.layers[i].objects[ii].update(deltaTime);
		}
	}
	
	if (!GAME.selection.target.start.equals(GAME.selection.target.end)) {
		GAME.context.save();
		GAME.context.translate(GAME.selection.target.start.x, GAME.selection.target.start.y);
		GAME.context.beginPath();
		GAME.context.ellipse(
			0,
			0,
			GAME.selection.target.radius,
			GAME.selection.target.radius,
			0,
			0,
			Math.PI * 2
		);
		GAME.context.stroke();
		GAME.context.restore();
	}
	
	GAME.context.save();
	GAME.context.font = "18px 'Fira Mono', monospace";
	GAME.context.fillStyle = "white";
	GAME.context.fillText(`Closed alpha programme - Version ${GAME.version}`, 10, 28);
	GAME.context.fillText(`fps: ${fps}/60`, 10, 48);
	GAME.context.restore();
	
	if (GAME.selection.active) {
		GAME.context.strokeRect(GAME.selection.start.x, GAME.selection.start.y, GAME.selection.w, GAME.selection.h);
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

const keybinds = new Map(),
			keystate = new Map();
GAME.camera = new Camera();
initialiseKeybinds(keybinds, keystate, GAME);
initialiseMousebinds(GAME);

//Actual game
setup().then(game => {
	console.log(game);
	game.add(
		new Unit(
			100,
			100,
			game.spritesheets[0],
			"alien/grunt1.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			200,
			100,
			game.spritesheets[0],
			"alien/grunt2.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			300,
			100,
			game.spritesheets[0],
			"alien/grunt3.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			400,
			100,
			game.spritesheets[0],
			"alien/commander.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			500,
			100,
			game.spritesheets[0],
			"human/grunt1.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			600,
			100,
			game.spritesheets[0],
			"human/grunt2.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			700,
			100,
			game.spritesheets[0],
			"human/grunt3.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			800,
			100,
			game.spritesheets[0],
			"human/grunt4.png"
		),
		game.layers[0]
	);
	game.add(
		new Unit(
			900,
			100,
			game.spritesheets[0],
			"human/commander.png"
		),
		game.layers[0]
	);
	let i = 100;
	while (i--) {
		game.add(
		new Unit(
			100+Math.random()*1080,
			100+Math.random()*520,
			game.spritesheets[0],
			"human/grunt2.png"
		),
		game.layers[0]
	);
	}
	update();
});