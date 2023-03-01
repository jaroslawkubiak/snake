"use strict";
// TODO
// przyspieszanie prędkości wraz ze wzrostem długości snake

import {
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  update as updateSnake,
  draw as drawSnake,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { score } from "./snake.js";

let lastRenderTime = 0;
const gameBoard = document.getElementById("game");
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    document.querySelector(".game-over").classList.remove("hidden");

    //saving data to local storage
    let bestScore = +localStorage.getItem("bestScore");
    if (!bestScore) {
      localStorage.setItem("bestScore", score);
      bestScore = score;
    } else if (score > bestScore) {
      localStorage.setItem("bestScore", score);
      bestScore = score;
    }
    document.querySelector(".game-over-score").innerText = `Score: ${score}`;
    document.querySelector(
      ".game-over-best-score"
    ).innerText = `Best score : ${bestScore}`;

    return;
  }

  window.requestAnimationFrame(main);

  // countig second passed from last frame render
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  //setting refresh rate to 2 times per second (if SNAKE_SPEED === 2)
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkForDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkForDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

// const swipeEl = document.querySelector(".swipe");
// swipeEl.addEventListener("click", () => {
//   swipeEl.classList.add("hidden");
// });
