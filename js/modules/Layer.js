export default class Layer {
	constructor(game) {
		this.objects = [];
		this.game = game;
	}
	
	get index() {
		return this.parent.lastIndexOf(this);
	}
	
	raise() {
		//
	}
	
	lower() {
		//
	}
	
	toFront() {
		let i = this.game.layers.length;
		while (i--) {
			if (this.game.layers[i] == this) {
				return;
			}
		}
		const me = this.game.layers.splice(i, 1);
		this.game.layers.push(me);
		return this;
	}
	
	toBack() {
		let i = this.game.layers.length;
		while (i--) {
			if (this.game.layers[i] == this) {
				return;
			}
		}
		const me = this.game.layers.splice(i, 1);
		this.game.layers.unshift(me);
		return this;
	}
}