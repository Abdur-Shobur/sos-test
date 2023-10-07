import { AiOutlinePlus } from 'react-icons/ai';
import SpecificationFields from './components/specification/SpecificationFields';

function ProductSpecificationAdd({ dispatch, state }) {
	// initial state

	// input field

	return (
		<div>
			{state.fields?.map((e) => (
				<SpecificationFields
					data={e}
					key={e.id}
					state={state}
					dispatch={dispatch}
				/>
			))}
			<div className="text-right">
				<button
					onClick={() =>
						dispatch({
							type: 'CREATE',
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

export default ProductSpecificationAdd;
