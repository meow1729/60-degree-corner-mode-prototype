let x = 400; // Starting x position
let y = 400; // Starting y position
let speed = 5; // Speed
let angle = 0; // Current angle in radians
let angleChange = Math.PI / 6; // Angle change in radians (equivalent to 60 degrees)
let trail = []; // Trail of the line
let gameOverMessage = ""; // Game over message

function setup() {
  createCanvas(800, 800); // Larger canvas size
  frameRate(10); // Adjust the speed of the line

  // Add event listener for arrow keys
  window.addEventListener("keydown", keyPressed);
}

function draw() {
  background(0); // Set background color to black
  moveLine();
  drawLine();
  checkCollision();
  displayGameOverMessage();
}

function moveLine() {
  // Move the line based on the current angle
  x += speed * cos(angle);
  y += speed * sin(angle);

  // Wrap around when reaching the edge
  if (x > width) {
    x = 0;
  } else if (x < 0) {
    x = width;
  }

  if (y > height) {
    y = 0;
  } else if (y < 0) {
    y = height;
  }

  // Add current position to the trail
  trail.push(createVector(x, y));
}

function drawLine() {
  // Draw the line and its trail with lime color and a thinner stroke
  stroke(0, 255, 0); // Lime color
  strokeWeight(3); // Thinner line
  for (let i = 0; i < trail.length; i++) {
    point(trail[i].x, trail[i].y);
  }
}

function checkCollision() {
  // Check if the line collides with itself or the walls
  for (let i = 0; i < trail.length - 1; i++) {
    let d = dist(x, y, trail[i].x, trail[i].y);
    if (d < 1) {
      // Collision with itself
      gameOver();
      break;
    }
  }

  if (x < 0 || x > width || y < 0 || y > height) {
    // Collision with the walls
    gameOver();
  }
}

function gameOver() {
  // Set the game over message
  gameOverMessage = "you noob";
  // Reset the round after 2 seconds
  setTimeout(resetRound, 2000);
}

function resetRound() {
  // Reset the game over message and the round
  gameOverMessage = "";
  x = 400; // Reset x position
  y = 400; // Reset y position
  angle = 0; // Reset angle
  trail = []; // Clear the trail
}

function displayGameOverMessage() {
  // Display the game over message on the screen
  fill(255, 0, 0);
  textSize(36); // Larger text size
  textAlign(CENTER);
  text(gameOverMessage, width / 2, height / 2);
  fill(0); // Reset fill color
}

function keyPressed() {
  // Control the line's direction using arrow keys
  if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW) {
      angle += angleChange;
    } else if (keyCode === LEFT_ARROW) {
      angle -= angleChange;
    }
  }
}
