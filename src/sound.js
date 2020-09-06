"use strict";

const starSound = new Audio("./sound/star.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const alienSound = new Audio("./sound/alien.mp3");
const winSound = new Audio("./sound/game_win.mp3");

export function playStar() {
  playSound(starSound);
}
export function playAlien() {
  playSound(alienSound);
}
export function playBackground() {
  playSound(bgSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playWin() {
  playSound(winSound);
}
export function stopBackground() {
  stopSound(bgSound);
}
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
