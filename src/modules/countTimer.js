function countTimer(deadline) {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds');

	function getTimeRemaining() {
		const dateStop = new Date(deadline).getTime(),
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



	const checkAndCreateTwoDigit = num =>
		(String(num).length === 1 ? '0' + num : num); // если число из 1 символа конкатинируем в начале 0

	const timerUpdate = () => {
		const timer = getTimeRemaining();
		if (timer.timeRemaining > 0) {
			timerHours.textContent = checkAndCreateTwoDigit(timer.hours);
			timerMinutes.textContent = checkAndCreateTwoDigit(timer.minutes);
			timerSeconds.textContent = checkAndCreateTwoDigit(timer.seconds);
		} else {
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
		}
		return timer;
	};

	function updateClock() {
		const idInterval = setInterval(() => {
			if (timerUpdate().timeRemaining <= 0) {
				clearInterval(idInterval);
			}
		}, 1000);
	}

	timerUpdate();
	updateClock();
}

export default countTimer;
