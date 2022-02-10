let canvas = document.getElementById('canvas');

let board = new Board(800, 400);
let bar = new Bar(20, 100, 40, 100, board);
let bar2 = new Bar(740, 100, 40, 100, board);
let board_view = new BoardView(canvas, board);
let ball = new Ball(350, 100, 10, board);

board_view.draw(); //dibujar por primera vez
window.requestAnimationFrame(controller); //seguir dibujarndo (simularFrames)
function controller() {
	board_view.play();
	window.requestAnimationFrame(controller); //recursividad
}


document.addEventListener('keydown', (ev) => {
	if (ev.key === 'ArrowUp') bar.up();
	if (ev.key === 'ArrowDown') bar.down();
	if (ev.key === 'W' || ev.key === 'w') bar2.up(); //W
	if (ev.key === 'S' || ev.key === 's') bar2.down(); //S
	if (ev.key === ' ') board.playing = !board.playing; // pausa  
});