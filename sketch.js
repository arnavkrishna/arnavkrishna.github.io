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


    // Set the initial color.
    currentColor = 'black';
}


function draw() {
    clear();

    // Check if mouse is over color palette
    const colorButtons = document.querySelectorAll('.color-button');
    let overColorPalette = false;
    colorButtons.forEach(button => {
        const rect = button.getBoundingClientRect();
        if (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
            overColorPalette = true;
        }
    });

    if (!overColorPalette && mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: currentColor
        };
        currentPath.push(point);
        document.body.style.cursor = "none"; // Add this line
    } else {
        if (currentPath.length > 0) {
            paths.push(currentPath);
            currentPath = [];
        }
        document.body.style.cursor = "default"; // Add this line
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




function keyPressed() {
    if (keyCode === 90 && keyIsDown(CONTROL)) { // if Z and CTRL are pressed
        paths.pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}