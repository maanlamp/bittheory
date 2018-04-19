import extendPrototype from "./Extend.js";

//Actual methods
extendPrototype(String, function capitalise () {
	return this[0].toUpperCase() + this.slice(1);
});

extendPrototype(String, function decapitalise () {
	return this[0].toLowerCase() + this.slice(1);
});

extendPrototype(String, function camelcasify () {
	const temp = this.replace(/[-_]/g, " ").words();
	return temp[0].decapitalise() + temp.slice(1).map((element) => element.capitalise()).join("");
});

extendPrototype(String, function first () {
	return this.slice(0, length);
});

extendPrototype(String, function last () {
	return this.slice(-length);
});

extendPrototype(String, function pad (length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
			return this.padLeft(length, padString).padRight(length, padString.reverse());
		break;
		case "string":
			padString = length;
			return padString + this + padString.reverse();
		break;
		default: throw new Error(`Cannot pad with ${length}`);
	}
});

extendPrototype(String, function padLeft (length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
		return padString.repeat(length) + this;
		break;
		case "string":
			padString = length;
			return padString + this;
		break;
		default: throw new Error(`Cannot pad with ${length}`);
	}
});

extendPrototype(String, function padRight (length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
		return this + padString.repeat(length);
		break;
		case "string":
			padString = length;
			return this + padString;
		break;
		default: throw new Error(`Cannot pad with ${length}`);
	}
});

extendPrototype(String, function reverse () {
	return this.letters().reverse().join("");
});

extendPrototype(String, function letters () {
	return this.match(/\w/g);
});

extendPrototype(String, function punctuationMarks () {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
});

extendPrototype(String, function escape () {
	return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
});

extendPrototype(String, function characters (ignoreWhitespace = true) {
	return (ignoreWhitespace) ? this.match(/\S/g) : [...this];
});

extendPrototype(String, function truncate (length, string = "...") {
	return `${this.slice(0, length)}${string}`;
});

extendPrototype(String, function words (includeSpecialCharacters = true) {
	return (includeSpecialCharacters) ? this.match(/\b[-'\w]+\b/g) : this.match(/\b\w+\b/g);
});

extendPrototype(String, function wordCount () {
	return this.words().length;
});

extendPrototype(String, function hyphenate () {
	return this.words(false).join("-");
});

import alias from "./Alias.js";
console.groupCollapsed("Aliasing...");
alias(String, "capitalise",   "capitalize");
alias(String, "decapitalise", "decapitalize");
alias(String, "camelcasify",  "camelCasify");
alias(String, "toLowerCase",  "toLower");
alias(String, "toLowerCase",  "lower");
alias(String, "toUpperCase",  "toUpper");
alias(String, "toUpperCase",  "upper");
console.groupEnd();

//titlecasify -> Title Case is Geweldig!