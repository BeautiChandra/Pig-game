"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0el = document.querySelector("#score--0");
const score1el = document.getElementById("score--1");
const currents0 = document.getElementById("current--0");
const currents1 = document.getElementById("current--1");

const diceel = document.querySelector(".dice");
const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");

let score, currentscore, activeplayer, playing;

const initialstate = function () {
  score = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0el.textContent = 0;
  score1el.textContent = 0;
  diceel.classList.add("hidden");

  currents0.textContent = 0;
  currents1.textContent = 0;

  player1El.classList.remove("player--active");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

initialstate();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnroll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceel.classList.remove("hidden");
    diceel.src = `image/dice-${dice}.png`;

    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    score[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];

    if (score[activeplayer] >= 100) {
      playing = false;
      diceel.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      switchplayer();
    }
  }
});
btnnew.addEventListener("click", initialstate);
