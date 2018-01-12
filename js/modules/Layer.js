export default class Layer {
	constructor(parent) {
		this.parent = parent;
		this.objects = [];
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
		let me = this.parent.splice(this.getIndex(), 1);
		this.parent.push(me);
		return this;
	}
	
	toBack() {
		let me = this.parent.splice(this.getIndex(), 1);
		this.parent.unshift(me);
		return this;
	}
}