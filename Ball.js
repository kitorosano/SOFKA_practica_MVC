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
			this.y + this.r > bar.y &&
			this.y - this.r < bar.y + bar.height &&
			this.x - this.r < bar.x + bar.width
		) {
			this.speed_x *= -1;
      console.log("dentro barra izq")
		}
	}
	checkCollisionRight(bar) {
		// check if ball is inside any bar, vertically and horizontally
		if (
			this.y + this.r > bar.y &&
			this.y - this.r < bar.y + bar.height &&
			this.x + this.r > bar.x
		) {
			this.speed_x *= -1;
      console.log("dentro barra der")
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
		if (this.y + this.r < 0 || this.x + this.r > canvas.height) {
      console.log("vertical")
			this.speed_y *= -1;
		}
		// check win states
		if (this.x - this.r > canvas.width) {
      leftscore++;
			this.reset();
		}
    
		if (this.x + this.r < 0) {
			rightscore++;
			this.reset();
		}
	}

	collision(bar) {
		// Reacciona a la colision con una barra que recibe como parametro
		var relative_intersect_y = bar.y + bar.height / 2 - this.y;

		var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

		this.bouce_angle = normalized_intersect_y * this.max_bounce_angle;

		this.speed_y = this.speed * -Math.sin(this.bouce_angle);
		this.speed_x = this.speed * Math.cos(this.bouce_angle);

		if (this.x > this.board.width / 2) this.direction = -1;
		else this.direction = 1;
	}

	show() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.r, 0, 7);
		this.ctx.fill();
		this.ctx.closePath();
	}

	#calculateNewAngle(valueToMap, min, max) {
		let newMin = (255 * Math.PI) / 180;
		let newMax = (135 * Math.PI) / 180;

		let slope = (newMax - newMin) / (max - min);

		return (angle = newMin + slope * (valueToMap - min));
	}
}
