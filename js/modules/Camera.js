import Vector2 from "./Vector2.js";

export default class Camera {
	constructor() {
		this.position = new Vector2(0, 0);
		this.target = this.position.copy();
	}
}