let leftscore = 0,
	rightscore = 0;
let canvas = document.getElementById('canvas');

(function () {
	let barLeft = new Bar(20, 100, 20, 100);
	let barRight = new Bar(740, 100, 20, 100);
	let ball = new Ball();

	let pause = true;
	let ctx = canvas.getContext('2d');

	document.addEventListener('keydown', (ev) => {
		if (ev.key === 'W' || ev.key === 'w') barLeft.move(-10); //W
		if (ev.key === 'S' || ev.key === 's') barLeft.move(10); //S
		if (ev.key === 'ArrowUp') barRight.move(-10);
		if (ev.key === 'ArrowDown') barRight.move(10);
		if (ev.key === ' ') pause = !pause; // pausa
		if (ev.key === 'R' || ev.key === 'r') {
			ball.reset();
			barLeft.reset();
			barRight.reset();
			leftscore = 0;
			rightscore = 0;
			pause = true;
		}
	});

	window.requestAnimationFrame(controller); //seguir dibujarndo (simularFrames)
	function controller() {
		clearScreen(); //limpiar por frame

		barLeft.show();
		barRight.show();

		ball.show();
		if (!pause) ball.move(); //mover la pelota cuando no estemos en pausa;
		// ball.edges();
		ball.checkCollisionLeft(barLeft);
		ball.checkCollisionRight(barRight);

		// Puntajes
		ctx.font = '32px serif';
		ctx.fillText(leftscore, 32, 40);
		ctx.fillText(rightscore, canvas.width - 64, 40);

		window.requestAnimationFrame(controller); //recursividad

		if (pause) {
			//dibujar texto pausa en el medio de la pantalla
			ctx.font = '64px serif';
			ctx.strokeText('PAUSE', canvas.width / 6 * 2.3, canvas.height / 3);
		}
	}

	function clearScreen() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
})();
