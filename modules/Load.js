export function loadImage (url) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("error", event => {
			reject(new Error(`"${url}" is not a proper image url.`));
		});
		image.addEventListener("load", event => {
			resolve(image);
		});
		image.src = url;
	});
}

export function loadJSON (url) {
	return fetch(new Request(url)).then(response => response.json());
}