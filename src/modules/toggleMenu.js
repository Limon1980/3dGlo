const toggleMenu = () => {
	const btnMenu = document.querySelector('.menu'),
		menu = document.querySelector('menu'),
		body = document.querySelector('body'),
		closeBtn = document.querySelector('.close-btn'),
		menuItems = menu.querySelectorAll('ul>li');


	const handlerMenu = () => {
		menu.classList.toggle('active-menu');
	};

	body.addEventListener('click', event => {
		const target = event.target;
		if (target.closest('.menu') === btnMenu) {
			handlerMenu();
		} else if (target === closeBtn) {
			event.preventDefault();
			handlerMenu();
		} else {
			menuItems.forEach(elem => {
				if (elem.firstChild === target) {
					handlerMenu();
				}
				const findActiveMenu = elem => elem.classList.contains('active-menu');
				const arr = Array.from(body.children);
				if (arr.find(findActiveMenu) && !(target.closest('menu'))) {
					handlerMenu();
				}

			});
		}

	});

};

export default toggleMenu;