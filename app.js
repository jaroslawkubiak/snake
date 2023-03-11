"use strict";
import {
  snakeSpeed,
  getSnakeHead,
  snakeIntersection,
  update as updateSnake,
  draw as drawSnake,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { score } from "./snake.js";

// TODO
// głowa i ogon - inne styl. dać oczy itp
// ikonki - tło z gestami gdzie można używać oraz strzałki w PC

let lastRenderTime = 0;
const gameBoard = document.getElementById("game");
const pauseBtn = document.getElementById("pause");
const swipeEl = document.querySelector(".swipe");

let gameOver = false;
let onPause = false;

const played = +localStorage.getItem("played");
if (played) swipeEl.classList.add("hidden");
else swipeEl.classList.remove("hidden");

// pause game button
pauseBtn.addEventListener("click", () => {
  onPause = !onPause;
  pauseBtn.classList.toggle("pause");
});

// refreshing game content on board
function main(currentTime) {
  //game over - display score
  if (gameOver) {
    showGameOver();
    return;
  }

  window.requestAnimationFrame(main);
  // countig second passed from last frame render
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  //setting refresh rate to 2 times per second (if snakeSpeed === 2)
  if (secondsSinceLastRender < 1 / snakeSpeed) return;
  lastRenderTime = currentTime;

  if (!onPause) {
    update();
    draw();
  }
}

window.requestAnimationFrame(main);

// updating snake
function update() {
  updateSnake();
  updateFood();
  checkForDeath();
}

// drawing snake and food on game board
function draw() {
  gameBoard.innerHTML = "";
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

// it's game over?
function checkForDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

// game over : show user score, best score and number of played games
function showGameOver() {
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

  // saving data : how many times user play the game
  let played = +localStorage.getItem("played");
  played++;
  localStorage.setItem("played", played);

  // display game summary to user
  document.querySelector(".game-over-score").innerText = `Score: ${score}`;
  document.querySelector(
    ".game-over-best-score"
  ).innerText = `Best score : ${bestScore}`;
  document.querySelector(
    ".game-over-played"
  ).innerText = `You played ${played} time${played === 1 ? "" : "s"}`;
}

// swipe to play info
function swipe() {
  swipeEl.classList.add("hidden");
  localStorage.setItem("played", 0);
}

swipeEl.addEventListener("click", swipe);
document.addEventListener("keydown", swipe);
