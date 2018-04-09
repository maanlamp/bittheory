import Entity from "../entities/Entity.js";
import Canvas from "../Canvas.js";

export default class Layer {
	constructor (game) {
		this.game = game;
		this.canvas = new Canvas(game.viewport.width, game.viewport.height, window);
		this.drawables = [];
	}

	get index () {
		const layers = this.game.layers;
		return layers.findIndex(element => element === this);
	}

	draw () {
		this.game.viewport.context.drawImage(this.canvas.buffer, 0, 0);
		this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	raise () {
		//Raising means later drawing means higher index
		const layers = this.game.layers;
		const i = this.index;
		const max = layers.length - 1;
		if (i >= max) throw new Error(`Cannot raise layer[${i}] any further.`);
		[ layers[i], layers[i + 1] ] = [ layers[i + 1], layers[i] ];
	}

	lower () {
		//Lowering means earlier drawing means lower index
		const layers = this.game.layers;
		const i = this.index;
		if (i <= 1) throw new Error(`Cannot lower layer[${i}] any further.`);
		[ layers[i - 1], layers[i] ] = [ layers[i], layers[i - 1] ];
	}

	toFront () {
		//The front is the highest point in an array
		const layers = this.game.layers;
		const i = this.index;
		const max = layers.length - 1;
		if (i === max) throw new Error(`Layer[${i}] already is at the front.`);
		layers.push(layers.splice(i, 1)[0]);
	}

	toBack () {
		//The back is the lowest point in an array
		const layers = this.game.layers;
		const i = this.index;
		const max = layers.length - 1;
		if (i === max) throw new Error(`Layer[${i}] already is at the back.`);
		layers.unshift(layers.splice(i, 1)[0]);
	}
}