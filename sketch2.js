let currentColor = "black"; // Setting black as the default color
let symmetry = 6; // Change this number for different symmetries
let angle = 360 / symmetry;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background(127);

    saveButton = createButton('save');
    saveButton.mousePressed(saveFile);
    saveButton.hide();

    clearButton = createButton('clear');
    clearButton.mousePressed(clearScreen);
    clearButton.hide();

    fullscreenButton = createButton('Full Screen');
    fullscreenButton.mousePressed(screenFull);
    fullscreenButton.hide()

    brushSizeSlider = createButton('Brush Size Slider');
    brushSizeSlider.hide();
    sizeSlider = createSlider(1, 32, 4, 0.1);
    sizeSlider.hide();

    // Add a mousePressed function to p5.js to capture when the mouse is pressed down
    mousePressed = () => {
        document.body.style.cursor = "none";
    };

    // Add a mouseReleased function to revert the cursor when the mouse button is released
    mouseReleased = () => {
        document.body.style.cursor = "default";
    };

    // Connect the color buttons to set the kaleidoscope line color
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.addEventListener('click', function () {
            currentColor = this.getAttribute('data-color');
        });
    });
}

function draw() {
    clear();

    stroke(currentColor);  // Setting the color for the kaleidoscope line

    // Kaleidoscope drawing
    translate(width / 2, height / 2 );

    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;

        if (mouseIsPressed) {
            for (let i = 0; i < symmetry; i++) {
                rotate(angle);
                let sw = sizeSlider.value();
                strokeWeight(sw);
                line(mx, my, pmx, pmy);
                push();
                scale(1, -1);
                line(mx, my, pmx, pmy);
                pop();
            }
        }
    }
}

function saveFile() {
    save('design.jpg');
}

function clearScreen() {
    background(127);
}

function screenFull() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function keyPressed() {
    if (keyCode === 90 && keyIsDown(CONTROL)) {
        paths.pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
