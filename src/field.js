"use strict";

import * as sound from "./sound.js";

const STAR_SIZE = 80;
export const ItemType = Object.freeze({
  star: "star",
  alien: "alien",
});
export class Field {
  constructor(starCount, alienCount) {
    this.starCount = starCount;
    this.alienCount = alienCount;

    this.field = document.querySelector(".game_field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".star")) {
      target.remove();
      sound.playStar();
      this.onItemClick && this.onItemClick(ItemType.star);
    } else if (target.matches(".alien")) {
      this.onItemClick && this.onItemClick(ItemType.alien);
    }
  };

  init() {
    this.field.innerHTML = "";
    this._addItem("alien", this.alienCount, "img/alien.png");
    this._addItem("star", this.starCount, "img/star.png");
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - STAR_SIZE * 2;
    const y2 = this.fieldRect.height - STAR_SIZE * 2;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.setAttribute("width", STAR_SIZE);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
