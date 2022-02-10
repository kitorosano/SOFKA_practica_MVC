let leftscore = 0, rightscore = 0;
let canvas = document.getElementById('canvas');

(function(){
  let board = new Board(800, 400);
  let board_view = new BoardView(canvas, board);
  let barLeft = new Bar(20, 100, 40, 100);
  let barRight = new Bar(740, 100, 40, 100);
  let ball = new Ball();

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'W' || ev.key === 'w') barLeft.move(-5); //W
    if (ev.key === 'S' || ev.key === 's') barLeft.move(5); //S
    if (ev.key === 'ArrowUp') barRight.move(-5);
    if (ev.key === 'ArrowDown') barRight.move(5);
    if (ev.key === ' ') board.playing = !board.playing; // pausa  
  });


  window.requestAnimationFrame(controller); //seguir dibujarndo (simularFrames)
  function controller() {
    
    board_view.clean();

    barLeft.show();
    // barLeft.update();
    barRight.show();
    // barRight.update();

    ball.show();
    ball.move();
    ball.edges();
    ball.checkCollision(barLeft);
    ball.checkCollision(barRight);


    window.requestAnimationFrame(controller); //recursividad
  }

})();