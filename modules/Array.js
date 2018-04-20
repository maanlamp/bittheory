import extendPrototype from "./Extend.js";

function toNumber(value) {
	return Number(value) || 0;
}

extendPrototype(Array, function average () {
	return this.reduce((total, current) => total += toNumber(current)) / this.length;
});

extendPrototype(Array, function pluck (value) {
	const returnValue = [];
	this.forEach(element => {
		//maybe switch statement? idk
		if (["string", "number"].includes(typeof value)) {
			if (element === value) returnValue.push(element);
		} else if (typeof value === "function") {
			if (value(element)) returnValue.push(element);
		} else if (typeof value === "object") {
			//mongo-like querying
		};
	});
	return returnValue;
});

extendPrototype(Array, function reject (value) {
	const pluckedValues = this.pluck(value);
	return this.filter(element => !pluckedValues.includes(element));
});

extendPrototype(Array, function max () {
	return this.reduce((max, current) => Math.max(max, toNumber(current)));
});

extendPrototype(Array, function min () {
	return this.reduce((min, current) => Math.min(min, toNumber(current)));
});

extendPrototype(Array, function first () {
	return this[0];
});

extendPrototype(Array, function last () {
	return this[this.length - 1];
});

extendPrototype(Array, function clone () {
	return this.slice();
});

extendPrototype(Array, function clear () {
	this.length = 0;
	return this;
});

import alias from "./Alias.js";
console.groupCollapsed("Aliasing...");
alias(Array, "average", "avg");
alias(Array, "reject",  "without");
alias(Array, "clone",   "copy");
console.groupEnd();