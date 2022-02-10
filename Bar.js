class Bar {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
    this.ctx = canvas.getContext('2d');
	}

	move(steps) {
		this.y += steps;
    this.y = this.#constrain();
	}

	toString() {
		return 'x: ' + this.x + ' y: ' + this.y;
	}

  show(){
    this.ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );  
  }

  #constrain(){
    if(this.y < 0) return 0
    if(this.y > (canvas.height - this.height)) return canvas.height - this.height;
    return this.y;
  }

} 