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

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = Math.ceil(
				price * typeValue * squareValue * countValue * dayValue
			);
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
				if (counter >= total) {
					totalValue.innerText = total;
				} else if (counter % 100 === 0) {
					totalValue.innerText = counter;
					setTimeout(count, 10);
				}
				counter += 100;
				return counter;
			};
		}

		const cicle = cycleDigit();

		if (total > 0) {
			cicle();
			console.log(total);
		} else {
			totalValue.textContent = 0;
		}
	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;
		// if(target.matches('.calc-type') || target.matches('.calc-squre') ||
		// target.matches('.calc-day') || target.matches('.calc-count')){

		// }
		// if (target === calcType || target === calcSquare ||
		//   target === calcDay || target === calcCount){
		//     console.log();
		//   }

		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
	});
};

export default calc;