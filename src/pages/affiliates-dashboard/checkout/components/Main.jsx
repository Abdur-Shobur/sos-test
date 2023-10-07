import React, { useEffect, useReducer, useState } from 'react';
import InputFields from './InputFields';
import { initialState, reducer } from './action';

function Main() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchFun = async () => {
			const res = await fetch('data.json');
			const getData = await res.json();
			setData(getData);
		};
		fetchFun();
	}, []);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: data[0],
		});
	}, [data]);
	return (
		<div>
			<InputFields state={state} dispatch={dispatch} />
		</div>
	);
}

export default Main;
