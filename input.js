// starting variables for snake position
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

// html elements
const restartGameBtn = document.getElementById("restart");
const newGameBtn = document.getElementById("new-game");

// restart game button
restartGameBtn.addEventListener("click", () => {
  window.location.reload();
});

// new game button
newGameBtn.addEventListener("click", () => {
  document.querySelector(".game-over").classList.add("hidden");
  window.location.reload();
  document.querySelector(".swipe").classList.add("hidden");
});

// changind direction functions
function goUp() {
  if (lastInputDirection.y !== 0) return;
  inputDirection = { x: 0, y: -1 };
}
function goDown() {
  if (lastInputDirection.y !== 0) return;
  inputDirection = { x: 0, y: 1 };
}
function goLeft() {
  if (lastInputDirection.x !== 0) return;
  inputDirection = { x: -1, y: 0 };
}
function goRight() {
  if (lastInputDirection.x !== 0) return;
  inputDirection = { x: 1, y: 0 };
}

// for touch controls
let moveX;
let moveY;

const el = document.querySelector(".wrapper");
el.addEventListener(
  "touchstart",
  e => {
    e.preventDefault();
    moveX = e.touches[0].clientX.toFixed(0);
    moveY = e.touches[0].clientY.toFixed(0);
  },
  { passive: false }
);

el.addEventListener(
  "touchmove",
  e => {
    e.preventDefault();
    if (!moveX || !moveY) {
      return;
    }

    let xUp = e.touches[0].clientX.toFixed(0);
    let yUp = e.touches[0].clientY.toFixed(0);

    let xDiff = moveX - xUp;
    let yDiff = moveY - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) goLeft();
      else goRight();
    } else {
      if (yDiff > 0) goUp();
      else goDown();
    }
  },
  { passive: false }
);

// for keybord key events
window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      goUp();
      break;
    case "ArrowDown":
    case "s":
      goDown();
      break;
    case "ArrowLeft":
    case "a":
      goLeft();
      break;
    case "ArrowRight":
    case "d":
      goRight();
      break;
  }
});

export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
