import Alias from "./Alias.js";

Array.prototype.average = function average () {
	return this.reduce((total, current) => total += current) / this.length;
}

Array.prototype.pluck = function pluck (value) {
	const ret = [];
	this.forEach(element => {
		//maybe switch statement? idk
		if (["string", "number"].includes(typeof value)) {
			if (element === value) ret.push(element);
		} else if (typeof value === "function") {
			if (value(element)) ret.push(element);
		} else if (typeof value === "object") {
			//mongo-like querying
		};
	});
	return ret;
}

Array.prototype.reject = function reject (value) {
	const temp = this.pluck(value);
	return this.filter(element => !temp.includes(element));
}

Array.prototype.max = function max () {
	return this.reduce((max, current) => Math.max(max, current));
}

Array.prototype.min = function min () {
	return this.reduce((min, current) => Math.min(min, current));
}

Array.prototype.first = function first () {
	return this[0];
}

Array.prototype.last = function last () {
	return this[this.length - 1];
}

console.groupCollapsed("Aliasing...");
new Alias(Array.prototype, "average", "avg");
new Alias(Array.prototype, "reject", "without");
console.groupEnd();