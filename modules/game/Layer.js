import Entity from "../entities/Entity.js";
import Canvas from "../Canvas.js";

export default class Layer {
	constructor (options) {
		this.parent = options.parent;
		this.canvas = new Canvas({
			width: window.innerWidth,
			height: window.innerHeight,
			parent: this.parent.canvas
		});
	}

	get index () {
		const layers = this.parent.layers;
		return layers.findIndex(element => element === this);
	}

	raise () {
		//Raising means later drawing means higher index
		const layers = this.parent.layers;
		const i = this.index;
		const max = layers.length - 1;
		if (i >= max) throw new Error(`Cannot raise layer[${i}] any further.`);
		[ layers[i], layers[i + 1] ] = [ layers[i + 1], layers[i] ];
	}

	lower () {
		//Lowering means earlier drawing means lower index
		const layers = this.parent.layers;
		const i = this.index;
		if (i <= 1) throw new Error(`Cannot lower layer[${i}] any further.`);
		[ layers[i - 1], layers[i] ] = [ layers[i], layers[i - 1] ];
	}

	toFront () {
		//The front is the highest point in an array
		const layers = this.parent.layers;
		const i = this.index;
		const max = layers.length - 1;
		if (i === max) throw new Error(`Layer[${i}] already is at the front.`);
		layers.push(layers.splice(i, 1)[0]);
	}

	toBack () {
		//The back is the lowest point in an array
		const layers = this.parent.layers;
		const i = this.index;
		const max = layers.length - 1;
		if (i === max) throw new Error(`Layer[${i}] already is at the back.`);
		layers.unshift(layers.splice(i, 1)[0]);
	}
}