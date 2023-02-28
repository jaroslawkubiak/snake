"use strict";
// TODO
// dodać sterowanie a, s, d, w
// dodać guziki do sterowania na mobile
// funkcja wynik
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

let lastRenderTime = 0;
const gameBoard = document.getElementById("game");
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if(confirm('You lost. Press ok to restart.')) {
        window.location = '/snake/index.html';
    }
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
