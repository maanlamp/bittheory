export default class Alias {
	constructor (prototype, method, alias) {
		this.prototype = prototype;
		this.method = method;
		this.alias = alias;
		try {
			this.prototype[alias] = this.prototype[method];
		} catch (err) {
			throw new Error(`Can't alias ${method}`);
		}
		console.log(`New ${this.prototype.constructor.name} alias: ${this.prototype[method].name} <-> ${this.alias}`);
	}
}