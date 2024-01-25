// board
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// snake body
let snakeBody = [];

//  food
let foodX;
let foodY;

// velocity
let velocityX = 0;
let velocityY = 0;

let isGameOver = false;

let start = null;
window.onload = () => {
  board = document.getElementById(" board");
  document.addEventListener("keyup", changeDirection);

  initGame();
  requestAnimationFrame((timestamp) => animation(timestamp, 0));
};

function initGame() {
  initSize();
  randomFood();
}

function animation(timestamp, elapsed) {
  if (isGameOver) {
    location.reload();
    return;
  }

  if (elapsed > 1000 / 15) {
    initBoard();
    initFood();
    initSnake();
    elapsed = 0;
  }

  requestAnimationFrame((_timestamp) =>
    animation(_timestamp, elapsed + _timestamp - timestamp)
  );
}

function initSize() {
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
}

function initBoard() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
}

function initSnake() {
  if (snakeX === foodX && snakeY === foodY) {
    randomFood();
    snakeBody.push({ x: foodX, y: foodY });
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = { x: snakeX, y: snakeY };
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  for (let item of snakeBody) {
    context.fillRect(item["x"], item["y"], blockSize, blockSize);
  }
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  gameOver();
}

function initFood() {
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
}

function randomFood() {
  foodX = Math.floor(Math.random() * rows) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
    return;
  }

  if (e.code === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
    return;
  }

  if (e.code === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
    return;
  }

  if (e.code === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
    return;
  }
}

function gameOver() {
  if (
    snakeX < 0 ||
    snakeX > blockSize * rows ||
    snakeY < 0 ||
    snakeY > blockSize * cols
  ) {
    isGameOver = true;
    alert("gameOver");
  }

  for (let i = 0; i <= snakeBody.length - 1; i++) {
    if (snakeBody[i]["x"] === snakeX && snakeBody[i]["y"] === snakeY) {
      isGameOver = true;
      alert("gameOver");
    }
  }
}
