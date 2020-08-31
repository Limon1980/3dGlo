window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    }

    let checkAndCreateTwoDigit = (num) => {
      return String(num).length === 1 ? ('0' + num) : num; // если число из 1 символа конкатинируем в начале 0
    };

    function updateClock() {
      let idInterval = setInterval(() => {
        let timer = getTimeRemaining();

        timerHours.textContent = checkAndCreateTwoDigit(timer.hours);
        timerMinutes.textContent = checkAndCreateTwoDigit(timer.minutes);
        timerSeconds.textContent = checkAndCreateTwoDigit(timer.seconds);
        if (timer.timeRemaining <= 0) {
          clearInterval(idInterval);
          timerHours.textContent = '00';
          timerMinutes.textContent = '00';
          timerSeconds.textContent = '00';
        }

      }, 1000);


    }

    updateClock();

  }

  countTimer('31 august 2020 22:00:00');
});