import React, { useReducer, useState } from 'react';

import { http } from '../../../../components/action/axiosInstance';
import { reducer } from '../../../../components/action/reducerAction';
import InputMain from '../../../../components/formComponent/InputMain';
import SelectMain from '../../../../components/formComponent/SelectMain';
import { ClockLoader } from 'react-spinners';
import tost from '../../../../components/action/tost';

function AdSize({ refetch }) {
	const [load, setLoad] = useState(false);

	const initialState = {
		name: '',
		status: 'pending',
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const handel_category_create = async (e) => {
		e.preventDefault();
		setLoad(true);
		http.post(`/store-size`, state).then((response) => {
			if (response.status === 200) {
				refetch();
				tost(response.data.message);
				setLoad(false);
			}
			setLoad(false);
		});
		e.target.reset();
	};

	return (
		<div className="col-xl-4 col-lg-12">
			<div className="ec-cat-list card card-default mb-24px">
				<div className="card-body">
					<div className="ec-cat-form">
						<h4>Add New Size</h4>

						<form onSubmit={handel_category_create}>
							<div className="form-group row">
								<InputMain
									dispatch={dispatch}
									dispatch_type="INPUT"
									label="Size Name"
									name="name"
									placeholder="xl"
									require={true}
									type="text"
								/>
							</div>

							<div className="form-group row">
								<SelectMain dispatch={dispatch} />
							</div>

							<div className="row">
								<div className="col-12">
									<button
										disabled={load}
										type="submit"
										className="btn btn-primary btn-pill d-flex align-items-center"
									>
										<span style={{ marginRight: '2px' }}>Create Size</span>{' '}
										{load && <ClockLoader color="#fff" size={15} />}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdSize;
