class World {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;

    this.images = {
      corner: loadImage('assets/background/corner_part-pixilart.png'),
      edge: loadImage('assets/background/edge_part-pixilart.png'),
      inner: loadImage('assets/background/inner_part-pixilart.png'),
    };
  }

  init() {}

  drawWorld() {
    // Iteration 1
    // Draw the grid
    // https://p5js.org/reference/#/p5/line

    //horizontal

    const colWidth = Math.floor(width / this.cols);
    const rowHeight = Math.floor(height / this.rows);

    imageMode(CENTER);
    // console.log('colW:', colWidth, ',rowH:', rowHeight);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        //upper left corner
        if (row === 0 && col === 0) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );

          rotate(90);
          image(this.images.corner, 0, 0);
          pop();
        }

        // upper edge
        if (row === 0 && col > 0) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );
          rotate(180);
          image(this.images.edge, 0, 0);
          pop();
        }

        // left edge
        if (row > 0 && col < this.cols - 1) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );
          rotate(90);
          image(this.images.edge, 0, 0);
          pop();
        }

        // inner field
        if (row > 0 && col > 0) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );
          image(this.images.inner, 0, 0);
          pop();
        }
        // right edge

        if (row > 0 && col === this.cols - 1) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );
          rotate(-90);
          image(this.images.edge, 0, 0);
          pop();
        }
        // upper right corner
        if (row === 0 && col === this.cols - 1) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );
          rotate(180);
          image(this.images.corner, 0, 0);
          pop();
        }

        //lower left corner
        if (row === this.rows - 1 && col === 0) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );

          image(this.images.corner, 0, 0);
          pop();
        }

        // lower edge
        if (row === this.rows - 1 && col > 0) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );

          image(this.images.edge, 0, 0);
          pop();
        }

        // lower right corner
        if (row === this.rows - 1 && col === this.cols - 1) {
          push();
          translate(
            col * colWidth + colWidth / 2,
            row * rowHeight + rowHeight / 2,
          );
          rotate(270);
          image(this.images.corner, 0, 0);
          pop();
        }
      }
    }
  }
}
