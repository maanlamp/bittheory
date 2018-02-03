import Vector2 from "./Vector2.js";

export default class Particle {
	constructor(position, sheet, sprite, direction, speed, lifetime) {
		this.parent = null;
		this.position = position;
		this.sheet = sheet;
		this.sprite = this.sheet.get(sprite);
		this._direction = direction;
		this.speed = speed;
		this.lifetime = lifetime;
		this.birthDate = window.performance.now();
		this.layer = null;
		this.game = null;
	}
	
	get direction() {
		return this._direction + 90;
	}
	
	get alpha() {
		let val = 1 - (window.performance.now() - this.birthDate) / this.lifetime;
		return (val > 0) ? val : 0;
	}
	
	get context() {
		return this.game.context;
	}
	
	kill() {
		let i = this.game.particles.length;
		while (i--) {
			if (this.game.particles[i] == this) {
				this.game.particles.splice(i, 1);
			}
		}
		i = this.layer.objects.length;
		while (i--) {
			if (this.layer.objects[i] == this) {
				this.layer.objects.splice(i, 1);
			}
		}
		//kill self, maybe emit new particles upon death.
	}
	
	spawnParticle(deltaTime) {
		//
	}
	
	update(deltaTime) {
		this.lifetime += 1;
		this.move(deltaTime);
		this.draw();
		if (this.alpha == 0) {
			this.kill();
		}
	}
	
	draw() {
		this.context.save();
		this.context.globalAlpha = this.alpha;
		this.context.translate(this.position.x, this.position.y);
		this.context.rotate(Vector2.radians(this.direction - 90));
		this.context.drawImage(this.sheet.buffer, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, -this.sprite.width/2, -this.sprite.height/2, this.sprite.width, this.sprite.height);
		this.context.restore();
	}
	
	move(deltaTime) {
		this.position.add(Vector2.lenDir(this.speed * deltaTime || 0, this.direction - 180));
	}
}