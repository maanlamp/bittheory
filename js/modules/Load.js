export function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener("load", () => {
			resolve(image);
		});
		image.src = url;
	});
}

export function loadJSON(url) {
	return fetch(new Request(url)).then(response => response.json());
}