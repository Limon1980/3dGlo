
import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise/auto';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import scroll from './modules/scroll';
import slider from './modules/slider';
import team from './modules/team';
import calcValidate from './modules/calcValidate';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validForm from './modules/validForm';

window.addEventListener('DOMContentLoaded', () => {

	// Таймер
	countTimer('23 september 2020 22:00:00');

	// Меню
	toggleMenu();

	//popup
	togglePopUp();

	//Табы
	tabs();

	// скролл до элемента
	scroll();

	// слайдер
	slider();

	// data атрибуты team
	team();

	// валидация калькулятора
	calcValidate();

	// калькулятор
	calc(100);

	// send-ajax-form
	sendForm(document.getElementById('form1'));
	sendForm(document.getElementById('form2'));
	sendForm(document.getElementById('form3'));

	// валидация формы

	validForm('#form1');
	validForm('#form2');
	validForm('#form3');
});
