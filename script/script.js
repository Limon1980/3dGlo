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
      return String(num).length === 1 ? '0' + num : num; // если число из 1 символа конкатинируем в начале 0
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

  countTimer('10 september 2020 22:00:00');

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      pupUpClose = document.querySelector('.popup-close');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        let width = document.documentElement.clientWidth;
        console.log(width);
        let popUpContent = document.querySelector('.popup-content');
        let count = 0;
        popup.style.display = 'block';

        let popupAnime = () => {
          count++;
          // console.log(count);
          popUpContent.style.left = count + '%';
          if (count < 38 && width > 768) {
            requestAnimationFrame(popupAnime);
          }
        };
        popupAnime();
      });
    });

    pupUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  togglePopUp();
});
