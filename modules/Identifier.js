export default function id (options) {
	let { length, type } = options;
	length = (length > 98) ? 98 : length;
	length = (length < 0) ? 0 : length;
	const retVal = Math.random().toFixed(length + 2).slice(2, 2 + length);
	return (type === "number") ? Number(retVal) : retVal;
}