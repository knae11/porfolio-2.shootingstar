"use strict";

import Popup from "./popup.js";

import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishBanner = new Popup();
const game = new GameBuilder()
  .gameDurationSec(7)
  .starcount(10)
  .alienCount(5)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "REPLAY?";
      sound.playAlert();
      break;
    case Reason.win:
      message = "WIN!";
      sound.playWin();
      break;
    case Reason.lose:
      message = "LOSE";
      sound.playAlien();
      break;
    default:
      throw new Error("not valid");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
