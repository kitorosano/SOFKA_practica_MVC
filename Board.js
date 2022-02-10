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