import { getInputDirection } from "./input.js";
let newSegment = 0;

export const SNAKE_SPEED = 1;
const snakeBody = [
  { x: 11, y: 11, head: true, tail: false },
  { x: 11, y: 12, head: false, tail: false },
  { x: 11, y: 13, head: false, tail: true },
];

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
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    // console.log(`x=${segment.x}, y=${segment.y}`);
    
    
    
    
    if (segment.head) snakeElement.classList.add("snake-head");
    else if (segment.tail) snakeElement.classList.add("snake-tail");
    else snakeElement.classList.add("snake");


    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegment += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}

function addSegments() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1], tail: true });
  }
  newSegment = 0;
}
