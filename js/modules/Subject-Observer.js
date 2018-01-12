export class Subject {
	constructor() {
		this.observers = [];
	}
	
	subscribe(observer) {
		this.observers.push(observer);
	}
	
	unsubscribe(observer) {
		let i = this.observers.indexOf(observer);
		if (i > -1) {
			this.observers.splice(i, 1);
		}
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
	update(subject) {
		console.log(`Updated ${subject}!`);
	}
}