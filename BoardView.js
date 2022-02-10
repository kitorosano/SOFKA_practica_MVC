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
    for(let element of this.board.elements){
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
					this.ctx.beginPath();
					this.ctx.arc(element.x, element.y, element.r, 0, 7);
					this.ctx.fill();
					this.ctx.closePath();
					break;
				default:
					break;
			}
		}
	}

  check_collisions(){
    for(let bar of this.board.bars){
      if(this.#hit(bar, this.board.ball))
        this.board.ball.collision(bar);
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

  #hit(bar,ball){
    let hit = false;

		// Si esta dentro del rango horizontal de la barra
		if ((ball.x + ball.r) >= bar.x && ball.x < (bar.x + bar.width)) {
			// Si esta dentro del rango vertical de la barra
			if ((ball.y + ball.r) >= bar.y && ball.y < (bar.y + bar.height)) {
				hit = true; //Basicamente, si esta adentro de la barra
			}
		} 
    

		// Colision de a con b
		if (ballx <= bar.x && (ballx + ballwidth) >= (bar.x + bar.width)) {
			if (bally <= bar.y && (bally + ballheight) >= (bar.y + bar.height)) {
				hit = true;
			}
		}

		// Colision b con a
		if (bar.x <= ballx && (bar.x + bar.width) >= (ballx + ballwidth)) {
			if (bar.y <= bally && (bar.y + bar.height) >= (bally + ballheight)) {
				hit = true;
			}
		}

		return hit;
  }
}