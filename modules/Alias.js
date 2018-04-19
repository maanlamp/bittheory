export default function aliasPrototypeMethod (prototype, method, alias) {
	prototype = (prototype.prototype) ? prototype.prototype : prototype;
	try {
		Object.defineProperty(prototype, alias, {
			value: prototype[method]
		});
	} catch (err) {
		throw new Error(`Can't alias ${method}`);
	}
	console.log(`New ${prototype.constructor.name} alias: ${prototype[method].name} <-> ${alias}`);
}