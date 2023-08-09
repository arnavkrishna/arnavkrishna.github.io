let currentColor;
let paths = [];
let currentPath = [];

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.id('drawing-canvas');

    // Get the color buttons and attach event listeners.
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // prevent event from bubbling up to other handlers
            currentColor = this.getAttribute('data-color');
        });
    });
    const undoButton = document.getElementById('undo-button');
    undoButton.addEventListener('click', undoLastPath);
}

function undoLastPath() {
    if (paths.length > 0) {
        paths.pop();
    }

    // Set the initial color.
    currentColor = 'black';
}


function draw() {
    clear();
  
    const undoButton = document.getElementById('undo-button');
    const undoButtonRect = undoButton.getBoundingClientRect();
  
    const overUndoButton = mouseX > undoButtonRect.left && mouseX < undoButtonRect.right && 
                           mouseY > undoButtonRect.top && mouseY < undoButtonRect.bottom;

    const colorButtons = document.querySelectorAll('.color-button');
    let overColorPalette = false;
    colorButtons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
        overColorPalette = true;
      }
    });

    if (!overColorPalette && !overUndoButton && mouseIsPressed) {
      const point = {
        x: mouseX,
        y: mouseY,
        color: currentColor
      };
      currentPath.push(point);
    } else {
      if (currentPath.length > 0) {
        paths.push(currentPath);
        currentPath = [];
      }
    }

    paths.forEach(path => {
        beginShape();
        noFill();
        path.forEach(point => {
            stroke(point.color);
            strokeWeight(7);
            vertex(point.x, point.y);
        });
        endShape();
    });

    if (currentPath.length > 0) {
        beginShape();
        noFill();
        currentPath.forEach(point => {
            stroke(point.color);
            strokeWeight(7);
            vertex(point.x, point.y);
        });
        endShape();
    }
}


function undoLastPath() {
    if (paths.length > 0) {
        paths.pop();
    }
}


function keyPressed() {
    if (keyCode === 90 && keyIsDown(CONTROL)) { // if Z and CTRL are pressed
        paths.pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
