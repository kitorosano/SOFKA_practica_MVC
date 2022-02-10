class Board {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
	}

	get elements() {
		let elements = this.bars.map((x) => x); // copia del array
		elements.push(this.ball);
		return elements;
	}
}

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

  get width(){
    return this.radius * 2;
  }
  get height(){
    return this.radius * 2;
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

class Bar {
	constructor(x, y, width, height, board) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this); //accedo al board, al bars y le agrego esta nueva Bar
		this.kind = 'rectangle';
		this.speed = 5;
	}

	down() {
		this.y += this.speed;
	}

	up() {
		this.y -= this.speed;
	}

	toString() {
		return 'x: ' + this.x + ' y: ' + this.y;
	}
}

class BoardView {
	constructor(canvas, board) {
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board;
		this.ctx = canvas.getContext('2d');
	}

	clean() {
		this.ctx.clearRect(0, 0, this.board.width, this.board.height);
	}

	draw() {
		for (let i = this.board.elements.length - 1; i >= 0; i--) {
			let element = this.board.elements[i];
			switch (element.kind) {
				case 'rectangle':
					this.ctx.fillRect(
						element.x,
						element.y,
						element.width,
						element.height
					);
					break;
				case 'circle':
					ctx.beginPath();
					ctx.arc(element.x, element.y, element.radius, 0, 7);
					ctx.fill();
					ctx.closePath();
					break;
				default:
					break;
			}
		}
	}

	play() {
		if (this.board.playing) {
			this.clean();
			this.draw();
      this.check_collisions();
			this.board.ball.move();
		}
	}
}


// =================================================================

let board = new Board(800, 400);
let bar = new Bar(20, 100, 40, 100, board);
let bar2 = new Bar(740, 100, 40, 100, board);
let canvas = document.getElementById('canvas');
let board_view = new BoardView(canvas, board);
let ball = new Ball(350, 100, 10, board);

document.addEventListener('keydown', (ev) => {
	ev.preventDefault(); //prevenir que baje la pagina por las dudas

	if (ev.key === 'ArrowUp') bar.up();
	if (ev.key === 'ArrowDown') bar.down();
	if (ev.key === 'W' || ev.key === 'w') bar2.up(); //W
	if (ev.key === 'S' || ev.key === 's') bar2.down(); //S
	if (ev.key === ' ') board.playing = !board.playing; // pausa
});

board_view.draw(); //dibujar por primera vez
window.requestAnimationFrame(controller);
function controller() {
	board_view.play();
	window.requestAnimationFrame(controller);
}
