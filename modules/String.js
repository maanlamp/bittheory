import Alias from "./Alias.js";

//Actual methods
String.prototype.capitalise = function capitalise () {
	return this[0].toUpperCase() + this.slice(1);
}

String.prototype.decapitalise = function decapitalise () {
	return this[0].toLowerCase() + this.slice(1);
}

String.prototype.camelcasify = function camelcasify () {
	const temp = this.replace(/[-_]/g, " ").words();
	return temp[0].decapitalise() + temp.slice(1).map((element) => element.capitalise()).join("");
}

String.prototype.first = function first (length = 1) {
	return this.slice(0, length);
}

String.prototype.last = function last (length = 1) {
	return this.slice(-length);
}

String.prototype.pad = function pad (length = 1, padString = " ") {
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
}

String.prototype.padLeft = function padLeft (length = 1, padString = " ") {
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
}

String.prototype.padRight = function padRight (length = 1, padString = " ") {
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
}

String.prototype.reverse = function reverse () {
	return this.letters().reverse().join("");
}

String.prototype.letters = function letters () {
	return this.match(/\w/g);
}

String.prototype.punctuationMarks = function punctuationMarks () {
	return this.match(/[-[\]{}()*+?.,^$|#!'"]/g);
}

String.prototype.escape = function escape () {
	return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

String.prototype.characters = function characters (ignoreWhitespace = true) {
	return (ignoreWhitespace) ? this.match(/\S/g) : [...this];
}

String.prototype.truncate = function truncate (length, string = "...") {
	return `${this.slice(0, length)}${string}`;
}

String.prototype.words = function words (includeSpecialCharacters = true) {
	return (includeSpecialCharacters) ? this.match(/\b[-'\w]+\b/g) : this.match(/\b\w+\b/g);
}

String.prototype.wordCount = function wordCount () {
	return this.words().length;
}

String.prototype.hyphenate = function hyphenate () {
	return this.words(false).join("-");
}

new Alias(String.prototype.capitalise,   "capitalize");
new Alias(String.prototype.decapitalise, "decapitalize");
new Alias(String.prototype.camelcasify,  "camelCasify");
new Alias(String.prototype.toLowerCase,  "toLower");
new Alias(String.prototype.toLowerCase,  "lower");
new Alias(String.prototype.toUpperCase,  "toUpper");
new Alias(String.prototype.toUpperCase,  "upper");

//titlecasify -> Title Case is Geweldig!
//Hyphenate (Woord woord -> Woord-woord)
//Maak replace slimmer: als je object meegeeft gebruik keys als find en replace met values