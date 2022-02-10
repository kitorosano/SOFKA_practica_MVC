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

}