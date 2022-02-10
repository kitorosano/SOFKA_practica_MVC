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