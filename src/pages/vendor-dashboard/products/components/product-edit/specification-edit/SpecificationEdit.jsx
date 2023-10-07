import { AiOutlinePlus } from 'react-icons/ai';
import FieldEdit from './FieldEdit';

function SpecificationEdit({ dispatch, state }) {
	// initial state

	// input field

	return (
		<div>
			{state.initial.specifications?.map((e) => (
				<FieldEdit data={e} key={e.id} state={state} dispatch={dispatch} />
			))}
			<div className="text-right">
				<button
					onClick={() =>
						dispatch({
							type: 'SPECIFICATION_CREATE',
						})
					}
					type="button"
					className="btn px-3 btn-sm btn-success mb-3"
				>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	);
}

export default SpecificationEdit;
