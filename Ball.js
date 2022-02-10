class Ball {
	constructor(x, y, r, board) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.speed_y = 0;
		this.speed_x = 3;
		this.board = board;
		this.direction = 1;

		board.ball = this;
		this.kind = 'circle';
	}

	move() {
		this.x += this.speed_x * this.direction;
		this.y += this.speed_y;
	}

  collision(bar) {
    // Reacciona a la colision con una barra que recibe como parametro
    var relative_intersect_y = bar.y + bar.height / 2 - this.y;

    var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

    this.bouce_angle = normalized_intersect_y * this.max_bounce_angle;

    this.speed_y = this.speed * -Math.sin(this.bouce_angle);
    this.speed_x = this.speed * Math.cos(this.bouce_angle);

    if (this.x > (this.board.width / 2)) this.direction = -1;
    else this.direction = 1;
  }
}