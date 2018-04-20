export default function extendPrototype (prototype, method) {
	Object.defineProperty((prototype.prototype) ? prototype.prototype : prototype, method.name, {
		value: method
	});
}