const team = () => {
	const command = document.querySelectorAll('.command__photo');

	command.forEach(elem => {
		elem.addEventListener('mouseenter', event => {
			event.target.src = event.target.dataset.img;
		});

		elem.addEventListener('mouseleave', event => {
			event.target.src = event.target.dataset.img.replace(/a(?=.jpg)/, '');
		});
	});
};

export default team;