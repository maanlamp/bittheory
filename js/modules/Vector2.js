export default class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	
	set(x, y = null) {
		if (x instanceof Vector2) {
			this.x = x.x;
			this.y = x.y;
		} else {
			this.x = x;
			this.y = (y !== null) ? y : x;
		}
		return this;
	}
	
	equals(other) {
		return (this.x === other.x && this.y === other.y);
	}
	
	lerp(other, factor = .5) {
		let value = this.add(other.subtracted(this).multiplied(factor));
		value.x = (value.x > -0.001 && value.x < 0.001) ? 0 : value.x;
		value.y = (value.y > -0.001 && value.y < 0.001) ? 0 : value.y;
		return value;
	}
	
	lerped(other, factor = .5) {
		return this.copy().lerp(other, factor);
	}
	
	get magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}
	
	distance(other) {
		return this.subtracted(other).magnitude;
	}
	
	angle(other, mode = "degrees") {
		let deltaX = other.x - this.x,
				deltaY = other.y - this.y,
				angle = Math.atan2(deltaY, deltaX) + Math.PI / 2;
		if (mode.toLowerCase().includes("deg")) {
			angle = Math.degrees(angle);
			return (angle < 0) ? angle + 360 : angle;
		}
		else if (mode.toLowerCase().includes("rad")) {
			return angle;
		} else {
			throw new Error(`Unknown angle mode "${mode}"`);
		}
	}
	
	normalise() {
		this.divide(this.magnitude());
	}
	
	get normalised() {
		return this.copy().divide(this.magnitude());
	}
	
	scale(other) {
		this.multiply(other);
	}
	
	scaled(other) {
		return this.copy().multiply(other);
	}
	
	copy(property) {
		if (typeof property === "string") {
			switch (property) {
				case "x": return new Vector2(this.x, 0);
				case "y": return new Vector2(0, this.y);
				default: throw new Error(`Cannot copy unknown property "${property}"`);
			}
		}
		return new Vector2(this.x, this.y);
	}
	
	static from(other) {
		if (other instanceof Array) {
			if (other.length > 2) {
				let returnArray = [];
				for (let i = 0; i < Math.floor(other.length / 2); i++) {
					returnArray.push(new Vector2(other[i], other[i + 1]));
				}
				return returnArray;
			}
			return new Vector2(other[0], other[1]);
		}
		else if (other instanceof Object) {
			if (other instanceof Vector2) {
				return other.copy()
			}
			return new Vector2(other.x, other.y);
		}
		throw new Error(`Cannot create Vector2 from "${other}"`);
	}
	
	subtract(other, otherOther = null) {
		if (other instanceof Vector2) {
			this.x -= other.x;
			this.y -= other.y;
		} else if (other.constructor.name === "Number") {
			if (otherOther !== null) {
				this.x -= other;
				this.y -= otherOther
			} else {
				this.x -= other;
				this.y -= other;
			}
		} else {
			throw new Error(`Cannot subtract by "${other}"`);
		}
		return this;
	}
	subtracted(other, otherOther = null) {
		return this.copy().subtract(other, otherOther);
	}
	
	multiply(other, otherOther = null) {
		if (other instanceof Vector2) {
			this.x *= other.x;
			this.y *= other.y;
		} else if (other.constructor.name === "Number") {
			if (otherOther !== null) {
				this.x *= other;
				this.y *= otherOther
			} else {
				this.x *= other;
				this.y *= other;
			}
		} else {
			throw new Error(`Cannot multiply by "${other}"`);
		}
		return this;
	}
	multiplied(other, otherOther = null) {
		return this.copy().multiply(other, otherOther);
	}
	
	divide(other, otherOther = null) {
		if (other instanceof Vector2) {
			this.x /= other.x || 1;
			this.y /= other.y || 1;
		} else if (other.constructor.name === "Number") {
			if (otherOther !== null) {
				this.x /= other || 1;
				this.y /= otherOther || 1;
			} else {
				this.x /= other || 1;
				this.y /= other || 1;
			}
		} else {
			throw new Error(`Cannot divide by "${other}"`);
		}
		return this;
	}
	divided(other, otherOther = null) {
		return this.copy().divide(other, otherOther);
	}
	
	add(other, otherOther = null) {
		if (other instanceof Vector2) {
			this.x += other.x;
			this.y += other.y;
		} else if (other.constructor.name === "Number") {
			if (otherOther !== null) {
				this.x += other;
				this.y += otherOther
			} else {
				this.x += other;
				this.y += other;
			}
		} else {
			throw new Error(`Cannot add "${other}"`);
		}
		return this;
	}
	added(other, otherOther = null) {
		return this.copy().add(other, otherOther);
	}
}