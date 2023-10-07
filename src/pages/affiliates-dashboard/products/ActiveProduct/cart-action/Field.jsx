import React from 'react';
import Input from './Input';

function Field({ state, dispatch, data }) {
	return state?.data?.map((v, i) => (
		<Input i={i} key={v.id} data={v} state={state} dispatch={dispatch} />
	));
}

export default Field;
