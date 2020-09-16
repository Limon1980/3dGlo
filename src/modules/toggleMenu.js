const toggleMenu = () => {
	const btnMenu = document.querySelector('.menu'),
		menu = document.querySelector('menu'),
		body = document.querySelector('body');
	// closeBtn = document.querySelector('.close-btn');
	// menuItems = menu.querySelectorAll('ul>li');

	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	body.addEventListener('click', event => {
		let target = event.target;

		if (target.parentNode === btnMenu) {
			handlerMenu();
		} else {
			target = target.closest('.active-menu');

			if (target) {
				handlerMenu();
			} else {
				target = event.target;

				const findActiveMenu = elem => elem.classList.contains('active-menu');

				const arr = Array.from(body.children);

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

export default toggleMenu;