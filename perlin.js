let gridCols = 10; // Number of columns in the grid
let gridRows = 10; // Number of rows in the grid
let scale = 37;  // Size of each cell in the grid
let inc = .05;   // Increment for the Perlin noise input
let zoff = 0;    // A third dimension in noise for time-based evolution

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = floor(width / scale);
  rows = floor(height / scale);
}

function draw() {
  background(211);  // White background
  ambientLight(255, 133, 230); // Soft purple ambient light
  directionalLight(255, 255, 255, 0.25, 0.25, -1); // Bright directional light

  // Rotate the scene for a tilted view
  rotateX(.7); // Tilts the view downwards
  rotateY(0);  // Rotates the view around the Y-axis

  translate(-width / 2, -height / 2, 0);  // Adjust translate for WEBGL mode

  let xoff = 0;
  for (let x = 0; x < cols; x++) {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let r = noise(xoff, yoff, zoff);
      let boxHeight = map(r, 0, 1, 20, 700);

      push();
      translate(x * scale + scale / 2, y * scale + scale / 2);
      fill(182, 250, 185);
      stroke(0);
      box(scale, scale, boxHeight);
      pop();

      yoff += inc;
    }
    xoff += inc;
  }
  zoff += 0.004; // Controls the speed of the wave movement
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  cols = floor(width / scale);
  rows = floor(height / scale);
}
