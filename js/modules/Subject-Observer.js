export class Subject {
	constructor() {
		this.observers = [];
	}
	
	notify(observer) {
		let i = this.observers.indexOf(observer);
		if (i > -1) {
			this.observers.update(this);
		}
	}
	
	notifyAll() {
		let i = this.observers.length;
		while (i--) {
			this.observers[i].update(this);
		}
	}
}

export class Observer {
	subscribe(other) {
		other.observers.push(this);
	}
	
	unsubscribe(other) {
		let i = other.observers.indexOf(this);
		if (i > -1) {
			other.observers.splice(i, 1);
		}
	}
	
	update(subject) {
		console.log(`${subject} notified ${this}!`);
	}
}