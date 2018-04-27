export default function extendPrototype (prototype, method) {
	console.log()
	Object.defineProperty((prototype.prototype) ? prototype.prototype : prototype, method.name, {
		value: method
	});
}