import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

const FieldEdit = ({ state, data, dispatch: handler }) => {
	return (
		<div className="row">
			<div className="col-md-6">
				<label className="form-label">specification</label>

				<input
					className="mb-1"
					placeholder="Specification"
					type="text"
					name="specification"
					defaultValue={data.specification}
					onChange={(e) => {
						handler({
							type: 'SPECIFICATION_TEXT_CHANGE',
							payload: {
								id: data?.id,
								value: e.target.value === '' ? null : e.target.value,
								name: e.target.name,
							},
						});
					}}
				/>
			</div>
			<div className="col-md-6  position-relative">
				<label className="form-label">specification ans</label>

				<input
					className="mb-1"
					placeholder="Specification Ans"
					type="text"
					name="specification_ans"
					defaultValue={data?.specification_ans}
					onChange={(e) => {
						handler({
							type: 'SPECIFICATION_TEXT_CHANGE',
							payload: {
								id: data?.id,
								value: e.target.value === '' ? null : e.target.value,
								name: e.target.name,
							},
						});
					}}
				/>
				<button
					type="button"
					disabled={state.initial.specifications.length === 1}
					style={{
						color: 'red',
						position: 'absolute',
						right: '20px',
						top: '45%',
						fontSize: '18px',
						display:
							state.initial.specifications.length === 1
								? 'none'
								: 'inline-block',
					}}
					onClick={() =>
						handler({
							type: 'DELETE_SPECIFICATIONS',
							payload: data.id,
						})
					}
				>
					<AiFillDelete />
				</button>
			</div>
		</div>
	);
};

export default FieldEdit;
