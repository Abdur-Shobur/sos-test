export const useDebounce = (setSearch, setPage) => {
	let getData = (e) => {
		setSearch(e.trim());
		setPage(1);
	};
	const doDebounce = function (fn, d) {
		let timer;
		return function (...args) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				fn(...args);
			}, d);
		};
	};
	const searchHandler = doDebounce(getData, 700);

	return { searchHandler };
};
