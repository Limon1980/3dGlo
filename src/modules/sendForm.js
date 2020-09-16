const sendForm = form => {
	const erorMessage = 'Что-то пошло не так...',
		laodMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const statusMessage = document.createElement('div');
	statusMessage.style.cssText = 'font-size: 2rem; color: red;';

	form.addEventListener('submit', e => {
		e.preventDefault();

		const formData = new FormData(form);
		// const body = {};

		// for (const val of formData.entries()) {
		// 	body[val[0]] = val[1];
		// }
		// console.log(body);

		const elementsForm = [...form.elements]
			.filter(e => e.type.toLowerCase() !== 'button' && e.type !== 'submit');

		let valid = false;

		elementsForm.forEach(e => {
			if (e.classList.contains('error-input')) {
				console.log('error');
				valid = false;
				return;
			}
			valid = true;
		});

		const postData = body => fetch('server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});
		const clearForm = () => {
			for (const el of form.elements) {
				if (el.tagName.toLowerCase() !== 'button' && el.type !== 'button') {
					el.value = '';
				}
			}
		};

		if (valid) {
			form.appendChild(statusMessage);
			statusMessage.textContent = laodMessage;

			postData(formData)
				.then(response => {
					if (response.status !== 200) {
						throw new Error('status network not 200');
					}

					statusMessage.textContent = successMessage;
					clearForm();
				})
				.catch(error => {
					statusMessage.textContent = erorMessage;
					console.error(error);
				});
		}
	});
};

export default sendForm;