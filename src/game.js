"use strict";

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});
//Builder pattern
export class GameBuilder {
  gameDurationSec(duration) {
    this.gameDurationSec = duration;
    return this;
  }

  starcount(num) {
    this.starcount = num;
    return this;
  }

  alienCount(num) {
    this.alienCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDurationSec, //
      this.starcount,
      this.alienCount
    );
  }
}
class Game {
  constructor(gameDurationSec, starCount, alienCount) {
    this.gameDurationSec = gameDurationSec;
    this.starCount = starCount;
    this.alienCount = alienCount;

    this.gameBtn = document.querySelector(".game_button");
    this.gameTimer = document.querySelector(".game_timer");
    this.gameScore = document.querySelector(".game_score");

    this.gameField = new Field(starCount, alienCount);
    this.gameField.setClickListner(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.pause(Reason.cancel);
      } else {
        this.start();
      }
    });
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.star) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.starCount) {
        this.pause(Reason.win);
      }
    } else if (item === ItemType.alien) {
      this.pause(Reason.lose);
    }
  };

  start() {
    this.started = true;
    this.init();
    this.showStopButton();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBackground();
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  pause(reason) {
    this.started = false;
    this.stopTimer();
    this.hideButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  init() {
    this.score = 0;
    this.gameScore.innerText = this.starCount;
    this.gameField.init();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fap-play");

    this.gameBtn.style.visibility = "visible";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startTimer() {
    let remainingTimeSec = this.gameDurationSec;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.pause(this.starCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
  hideButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} : ${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.starCount - this.score;
  }
}
