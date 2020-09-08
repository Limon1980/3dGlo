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
      body = document.querySelector('body'),
      closeBtn = document.querySelector('.close-btn');
    // menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    body.addEventListener('click', (event) => {
      let target = event.target;

      if (target.parentNode === btnMenu ) {
        handlerMenu();
      } else {
        target = target.closest('.active-menu');

        if (target) {
          handlerMenu();
        } else {
          target = event.target;

          const findActiveMenu = (elem) => {
            return elem.classList.contains('active-menu');
          };

          let arr = Array.from(body.children);

          // console.log(body.children[1].classList.contains('active-menu'));
          if (arr.find(findActiveMenu)) {
            handlerMenu();
          }
        }
      }
    });
    // btnMenu.addEventListener('click', handlerMenu);
    // closeBtn.addEventListener('click', handlerMenu);
    // menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        let width = document.documentElement.clientWidth;
        // console.log(width);
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

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };

  togglePopUp();

  //Табы

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };

  tabs();

  // слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      slider = document.querySelector('.portfolio-content'),
      portfolioDots = document.querySelector('.portfolio-dots');

    // console.log(portfolioDots);
    // console.log(slide.length);

    // добавим блоки li равные колличесву слайдов на странице
    for (let i = 0; i < slide.length; i++) {
      if (i === 0) {
        portfolioDots.insertAdjacentHTML(
          'beforeend',
          `<li class="dot dot-active"></li>`
        );
        continue;
      }

      portfolioDots.insertAdjacentHTML('beforeend', `<li class="dot"></li>`);
    }

    const dot = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (
        event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')
      ) {
        stopSlide();
      }
    });
    slider.addEventListener('mouseout', (event) => {
      if (
        event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')
      ) {
        startSlide();
      }
    });

    startSlide(1500);
  };

  slider();

  // data атрибуты

  const team = () => {
  const command = document.querySelectorAll('.command__photo');

  command.forEach((elem) => {
    elem.addEventListener('mouseenter', (event) => {
    event.target.src = event.target.dataset.img;
    });

    elem.addEventListener('mouseleave', (event) => {

      event.target.src = event.target.dataset.img.replace(/a(?=.jpg)/, '');
      
    });

  });
};

team();

 // валидация калькулятора
 const calcValidate = () => {
  const calcBlock = document.querySelector('.calc-block');

  calcBlock.addEventListener('input', (e) => {
    if (e.target.matches('.calc-square') ||
      e.target.matches('.calc-count') ||
      e.target.matches('.calc-day')) {
      e.target.value = e.target.value.replace(/\D/g, '');
    }
  });
};
calcValidate();

// калькулятор

const calc = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    

      const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
               squareValue = +calcSquare.value;

              if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
              }

              if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
              } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
              }
               
        if(typeValue && squareValue){
          total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
        }

        // let iter = 0;
        // const cycleDigit = () =>{
  
        //   totalValue.innerText = iter;
        //   if (iter < total){
        //     setTimeout(cycleDigit, 10);
        //     iter = iter + Math.ceil(total/100);
        //   }
        // };

        function cycleDigit() {
          let counter = 0;
            return function count() {
              
              if (counter <= total){
                setTimeout(count, 1);
                // counter = counter + Math.ceil(total/10);
              }

               if (counter >= total){
                totalValue.innerText = total;
              } else if(counter % 10 === 0){
                totalValue.innerText = counter;
              }
                counter = counter + 10;
               return counter;
            };
        }
        
        let cicle = cycleDigit();
    

        if (total > 0){
          cicle();
          console.log(total);
        } else {
          totalValue.textContent = 0;
        }
        
      };

     

      calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        // if(target.matches('.calc-type') || target.matches('.calc-squre') || 
        // target.matches('.calc-day') || target.matches('.calc-count')){
          
        // }
          // if (target === calcType || target === calcSquare ||
          //   target === calcDay || target === calcCount){
          //     console.log();
          //   }

          if (target.matches('select') || target.matches('input')){
            countSum();
          }
      });
};

calc(100);
});

