const togglePopUp = () => {
	const popup = document.querySelector('.popup'),
		popupBtn = document.querySelectorAll('.popup-btn');

	popupBtn.forEach(elem => {
		elem.addEventListener('click', () => {
			const width = document.documentElement.clientWidth;
			// console.log(width);
			const popUpContent = document.querySelector('.popup-content');
			let count = 0;
			popup.style.display = 'block';

			const popupAnime = () => {
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

	popup.addEventListener('click', event => {
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

export default togglePopUp;