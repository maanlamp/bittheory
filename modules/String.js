//Actual methods
String.prototype.capitalise = function () {
	return this[0].toUpperCase() + this.slice(1);
}

String.prototype.decapitalise = function () {
	return this[0].toLowerCase() + this.slice(1);
}

String.prototype.camelcasify = function () {
	const temp = this.replace(/[-_]/g, " ").words();
	return temp[0] + temp.slice(1).map((element) => element.capitalise()).join("");
}

String.prototype.first = function (length = 1) {
	return this.slice(0, length);
}

String.prototype.last = function (length = 1) {
	return this.slice(-length);
}

String.prototype.pad = function(length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
			return this.padLeft(length, padString).padRight(length, padString.reverse());
		break;
		case "string":
			padString = length;
			return `${padString}${this}${padString.reverse()}`;
		break;
		default: throw new Error(`Cannot pad with ${length}`);
	}
}

String.prototype.padLeft = function (length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
		return `${padString.repeat(length)}${this}`;
		break;
		case "string":
			padString = length;
			return `${padString}${this}`;
		break;
		default: throw new Error(`Cannot pad with ${length}`);
	}
}

String.prototype.padRight = function (length = 1, padString = " ") {
	switch (typeof length) {
		case "number":
		return `${this}${padString.repeat(length)}`;
		break;
		case "string":
			padString = length;
			return `${this}${padString}`;
		break;
		default: throw new Error(`Cannot pad with ${length}`);
	}
}

String.prototype.reverse = function () {
	return this.letters().reverse().join("");
}

String.prototype.letters = function () {
	return [...this];
}

String.prototype.words = function () {
	return this.split(/\s+/g);
}

//Aliases
class Alias {
	constructor (method, alias) {
		switch (typeof method) {
			case "string":
				String.prototype[alias] = String.prototype[method];
			break;
			case "function":
				String.prototype[alias] = method;
			break;
			default: throw new Error(`Can't alias ${method}`);
		}
	}
}
new Alias(String.prototype.capitalise, "capitalize");
new Alias(String.prototype.decapitalise, "decapitalize");
new Alias(String.prototype.camelcasify, "camelCasify");
new Alias(String.prototype.toLowerCase, "toLower");
new Alias(String.prototype.toLowerCase, "lower");
new Alias(String.prototype.toUpperCase, "toUpper");
new Alias(String.prototype.toUpperCase, "upper");

//titlecasify -> Title Case is Geweldig!
//Hyphenate (Woord woord -> Woord-woord)
//words (Hoi! ik ben Wouter-Wilfons Lem -> [Hoi, ik, ben, Wouter-Wilfons, Lem])
//wordCount
//truncate (blablablabla -> blablab...) ... default maar kan ook anders
//Maak replace slimmer: als je object meegeeft gebruik keys als find en replace met values