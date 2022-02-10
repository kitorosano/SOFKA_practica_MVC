let leftscore = 0,
	rightscore = 0;
const MAXPOINTS = 7;
let canvas = document.getElementById('canvas');

(function () {
	let barLeft = new Bar(10, 100, 20, 100);
	let barRight = new Bar(770, 100, 20, 100);
	let ball = new Ball();

	let pause = true, end = false;
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
      end = false;
      pause = true;
		};
    if (ev.key === 'L' || ev.key === 'l') turnLights();
	});

	window.requestAnimationFrame(controller); //seguir dibujarndo (simularFrames)
	function controller() {
    ctx.fillStyle = lights ? 'black' : 'whitesmoke';
    ctx.strokeStyle = lights ? 'black' : 'whitesmoke';
		if (!end) {
			clearScreen(); //limpiar por frame

			barLeft.show();
			barRight.show();

			ball.show();
			if (!pause) ball.move(); //mover la pelota cuando no estemos en pausa;
			ball.edges();
			ball.checkCollisionLeft(barLeft);
			ball.checkCollisionRight(barRight);

			// Puntajes
			ctx.font = '32px serif';
			ctx.fillText(leftscore, 32, 40);
			ctx.fillText(rightscore, canvas.width - 64, 40);

			window.requestAnimationFrame(controller); //recursividad

			//cuando este en PAUSA dibujar texto pausa en el medio de la pantalla
			if (pause) {
				ctx.font = '64px serif';
				ctx.strokeText('PAUSE', (canvas.width / 6) * 2.3, canvas.height / 3);
			}
		}

    // El juego termina cuando se alcanza el puntaje max.s
		if (leftscore >= MAXPOINTS || rightscore >= MAXPOINTS) {
      end = true;
			ctx.font = '64px serif';
			ctx.strokeText('END', (canvas.width / 6) * 2.5, canvas.height / 3);
		}
	}

	function clearScreen() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
})();


let lights = true;
let imagen = document.getElementById('myImage');
imagen.addEventListener('click', () => {
  lights = !lights;

  let title = document.querySelector('h1');
  let instrucctions = document.querySelectorAll('p');
  

  title.classList.toggle('lightsOFFText')
  instrucctions.forEach(elt => elt.classList.toggle('lightsOFFText'));
  document.body.classList.toggle('lightsOFFBG')
  canvas.classList.toggle('lightsOFFCanvas')

  
  imagen.src = lights ? 'images/FocoON.png' : 'images/FocoOFF.png';
})
