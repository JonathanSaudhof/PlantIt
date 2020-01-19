Class World{

    constructor(){

    }

    init(){
        
    }


    drawGrid() {
    // Iteration 1
    // Draw the grid
    // https://p5js.org/reference/#/p5/line

    //horizontal lines
    for (let y = 0; y <= WIDTH; y += SQUARE_SIDE) {
      line(0, y, WIDTH, y);
    }

    //vertical lines
    for (let x = 0; x <= HEIGHT; x += SQUARE_SIDE) {
      line(x, 0, x, HEIGHT);
    }
  }
}