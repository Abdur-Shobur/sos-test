const time = (payload) => {
	const localTime = new Date(payload).toLocaleString();
	return localTime;
};

export default time;
