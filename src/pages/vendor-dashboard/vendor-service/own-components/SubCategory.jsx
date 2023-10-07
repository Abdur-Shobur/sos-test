import React from 'react';

function SubCategory({ dispatch, data, error, categoryID, subCategory }) {
	return (
		<div className="col-lg-6 position-relative mb-3">
			<label for="parent-category">
				<span>
					Sub Category{' '}
					{error && (
						<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
							({error[0]})
						</span>
					)}
				</span>
			</label>
			<div>
				<select
					style={{
						border: error && '1px solid #ffa7a7',
					}}
					id="parent-category"
					name="service_sub_category_id"
					className="custom-select"
					onChange={(e) => {
						dispatch({
							type: 'INPUT',
							payload: {
								name: e.target.name,
								value: e.target.value ? e.target.value : null,
							},
						});
					}}
				>
					<option value="" selected={data == '' || data == null}>
						Select
					</option>

					{subCategory
						?.filter((x) => x.service_category_id == categoryID)
						?.map((e) => (
							<option selected={data == e.id} key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
				</select>
			</div>
		</div>
	);
}

export default SubCategory;
