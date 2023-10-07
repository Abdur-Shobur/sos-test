import React from 'react';

function Category({ dispatch, data, error, options }) {
	return (
		<div className="col-lg-6 position-relative mb-3">
			<label for="parent-category">
				<span>
					Category{' '}
					{error && (
						<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
							({error[0]})
						</span>
					)}
				</span>
			</label>
			<div>
				<select
					id="parent-category"
					name="service_category_id"
					className="custom-select"
					style={{
						border: error && '1px solid #ffa7a7',
					}}
					onChange={(e) => {
						dispatch({
							type: 'CATEGORY_DISPATCH',
							payload: {
								name: e.target.name,
								value: e.target.value,
							},
						});
					}}
				>
					<option disabled selected={data == null}>
						Select
					</option>
					{options?.map((e) => (
						<option selected={data == e.id} key={e?.id} value={e?.id}>
							{e?.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default Category;
