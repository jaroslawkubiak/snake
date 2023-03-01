let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

const restartGame = document.getElementById("restart");
const newGame = document.getElementById("new-game");

newGame.addEventListener("click", () => {
  console.log("newGame");
  document.querySelector(".game-over").classList.add("hidden");
  window.location.reload();
});

restartGame.addEventListener("click", () => {
  console.log("restart");
  window.location.reload();
});

function goUp() {
  // console.log("goUp");
  if (lastInputDirection.y !== 0) return;
  inputDirection = { x: 0, y: -1 };
}
function goDown() {
  // console.log("ugoDownp");
  if (lastInputDirection.y !== 0) return;
  inputDirection = { x: 0, y: 1 };
}
function goLeft() {
  // console.log("goLeft");
  if (lastInputDirection.x !== 0) return;
  inputDirection = { x: -1, y: 0 };
}
function goRight() {
  // console.log("goRight");
  if (lastInputDirection.x !== 0) return;
  inputDirection = { x: 1, y: 0 };
}

let moveX;
let moveY;

const el = document.querySelector(".snake-game");
el.addEventListener(
  "touchstart",
  e => {
    e.preventDefault();
    moveX = e.touches[0].clientX.toFixed(0);
    moveY = e.touches[0].clientY.toFixed(0);
    // console.log(`START X:${moveX}, Y:${moveY}`);
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

    var xUp = e.touches[0].clientX.toFixed(0);
    var yUp = e.touches[0].clientY.toFixed(0);

    var xDiff = moveX - xUp;
    var yDiff = moveY - yUp;
    // console.log(`X:${xDiff}, Y:${yDiff}`);

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // console.log("######  move left ############");
        goLeft();
      } else {
        // console.log("######  move right ############");
        goRight();
      }
    } else {
      if (yDiff > 0) {
        // console.log("######  move up ############");
        goUp();
      } else {
        // console.log("######  move down ############");
        goDown();
      }
    }
  },
  { passive: false }
);

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
