class Ball {
	constructor() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.r = 10;
		this.speed_x = 0;
		this.speed_y = 0;
		this.ctx = canvas.getContext('2d');

		this.reset(); //Call reset to setup everything
	}

	checkCollisionLeft(bar) {
		// check if ball is inside any bar, vertically and horizontally
		if (
			this.y - this.r < bar.y + bar.height &&
			this.y + this.r > bar.y &&
			this.x - this.r < bar.x + bar.width
		) {
			if (this.x > bar.x) {
				// during the time when the absolute ball.x position isn't over the bar.x
				let differenceInHeight = this.y - bar.y;
				let angle = this.#calculateNewAngle(
					differenceInHeight,
					0,
					bar.height,
					-45,
					45
				); // generate a new angle for the ball after it bounce
				this.speed_x = 5 * Math.cos(angle);
				this.speed_y = 5 * Math.sin(angle);
				this.x = bar.x + bar.width + this.r; // reasingning ball.x, so it doesn't collide again
			}
		}
	}
	checkCollisionRight(bar) {
		// check if ball is inside any bar, vertically and horizontally
		if (
			this.y - this.r < bar.y + bar.height &&
			this.y + this.r > bar.y &&
			this.x + this.r > bar.x
		) {
			if (this.x < bar.x + bar.width) {
				// during the time when the absolute ball.x position isn't over the bar.x
				let differenceInHeight = this.y - bar.y;
				let angle = this.#calculateNewAngle(
					differenceInHeight,
					0,
					bar.height,
					255,
					135
				); // generate a new angle for the ball after it bounce
				this.speed_x = 5 * Math.cos(angle);
				this.speed_y = 5 * Math.sin(angle);
				this.x = bar.x - this.r; // reasingning ball.x so it doesn't collide again
			}
		}
	}

	move() {
		this.x += this.speed_x;
		this.y += this.speed_y;
	}

	reset() {
		// Reset ball position to the center of the canvas
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;

		// give random angle as start up direction
		let angle = Math.random() * (Math.PI / 4 + Math.PI / 4) - Math.PI / 4;
		this.speed_x = 5 * Math.cos(angle);
		this.speed_y = 5 * Math.sin(angle);

		// give random speed for that game
		if (Math.random() < 0.5) {
			this.speed_x *= -1;
		}
	}

	edges() {
		// check vertical edges
		if (this.y - this.r < 0 || this.y + this.r > canvas.height) {
			this.speed_y *= -1;
		}

		// check win states
		if (this.x - this.r > canvas.width) {
			scoreSnd.play();
			leftscore++;
			this.reset();
		}

		if (this.x + this.r < 0) {
			scoreSnd.play();
			rightscore++;
			this.reset();
		}
	}

	show() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.r, 0, 7);
		this.ctx.fill();
		this.ctx.closePath();
	}

	#calculateNewAngle(valueToMap, min, max, newMin, newMax) {
		let newMinRad = (newMin * Math.PI) / 180; // 255 radians
		let newMaxRad = (newMax * Math.PI) / 180; // 135 radians

		let slope = (newMaxRad - newMinRad) / (max - min);

		let newAngle = newMinRad + slope * (valueToMap - min);
		// console.log(newAngle)
		return newAngle;
	}
}
