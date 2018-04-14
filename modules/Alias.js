export default class Alias {
	constructor (method, alias) {
		this.method = method;
		this.alias = alias;
		switch (typeof method) {
			case "string":
				String.prototype[alias] = String.prototype[method];
			break;
			case "function":
				String.prototype[alias] = method;
			break;
			default: throw new Error(`Can't alias ${method}`);
		}
		console.log(`New alias: ${this.method.name} <-> ${this.alias}`);
	}
}