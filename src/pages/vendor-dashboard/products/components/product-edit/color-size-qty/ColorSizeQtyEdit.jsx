import React, { useEffect, useState } from 'react';
import Fields from './Fields';

function ColorSizeQtyEdit({ getState, dispatch }) {
	const [state, setState] = useState({});
	useEffect(() => {
		setState(getState);
	}, [getState]);
	return (
		<div>
			{state?.initial?.variants?.map((e, i) => (
				<Fields key={e.id} getData={e} state={state} dispatch={dispatch} />
			))}
			<div className="text-right">
				<button
					disabled={state?.selected?.length >= state?.apiData?.length}
					type="button"
					className="btn px-3 btn-sm btn-success mb-3"
					onClick={() => {
						dispatch({
							type: 'CREATE_COLOR_SIZE',
							payload: {
								size_name:
									state?.api?.sizes?.[0]?.name !== undefined
										? state.api.sizes[0].name
										: null,
								size_id:
									state?.api?.sizes?.[0]?.id !== undefined
										? state.api.sizes[0].id
										: null,
								color_name: state.api.colors[0].name
									? state.api.colors[0].name
									: null,
								color_id: state.api.colors[0].id
									? state.api.colors[0].id
									: null,
							},
						});
					}}
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						t="1551322312294"
						viewBox="0 0 1024 1024"
						version="1.1"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs></defs>
						<path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
						<path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
					</svg>
				</button>
			</div>
			{/* <p>{JSON.stringify(state.selected, undefined, 2)}</p> */}
		</div>
	);
}

export default ColorSizeQtyEdit;
