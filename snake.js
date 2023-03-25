import { getInputDirection } from "./input.js";

export let score = 0;
export let snakeSpeed = 5;

const scoreElement = document.getElementById("score");
let newSegment = 0;
const snakeBody = [{ x: 8, y: 9, head: true, tail: false }];

// updating snake position on gameBoard
export function update() {
  addSegments();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    let tail = false;
    if (i + 1 === snakeBody.length - 1) tail = true;
    snakeBody[i + 1] = { ...snakeBody[i], head: false, tail: tail };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
  snakeBody[0].head = true;
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const inputDirection = getInputDirection();
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    if (segment.head) {
      snakeElement.classList.add("snake-head");

      // if snake head have some shape - changing snake head directions
      if (inputDirection.x === 0 && inputDirection.y === -1)
        snakeElement.classList.add("going-up");
      if (inputDirection.x === 0 && inputDirection.y === 1)
        snakeElement.classList.add("going-down");
      if (inputDirection.x === -1 && inputDirection.y === 0)
        snakeElement.classList.add("going-left");
      if (inputDirection.x === 1 && inputDirection.y === 0)
        snakeElement.classList.add("going-right");
    } else if (segment.tail) snakeElement.classList.add("snake-tail");
    else snakeElement.classList.add("snake");

    gameBoard.appendChild(snakeElement);
  });
}

// converting score to 4-digit string, with leading 0
function pad(number) {
  let str = "" + number;
  while (str.length < 4) str = "0" + str;
  return str;
}

// expand snake - eat food
export function expandSnake(amount) {
  newSegment += amount;
  score += amount;
  scoreElement.innerText = pad(score);

  // increasing speed according to score, for every 10 point speed + 0.5 
  if (score % 10 === 0) snakeSpeed += 0.5;
}

// check if head of snake is on his body - game over
export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

// getting snake body cords
export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

// checking if given positions are equal
function equalPositions(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}

// expanding snake size - adding new segments, new object with position X and Y
function addSegments() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1], tail: true });
  }
  newSegment = 0;
}


