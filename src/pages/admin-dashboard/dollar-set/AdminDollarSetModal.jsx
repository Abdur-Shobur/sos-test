import React, { useState } from 'react';
import { http } from '../../../components/action/axiosInstance';
import { Link } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import tost from '../../../components/action/tost';
import { useReducer } from 'react';
import InputEdit from '../../../components/formComponent/InputEdit';
import EditLoader from '../../../components/loader/EditLoader';
import { GetAdminDollarSetData } from '../../../api/admin/apiAdmin';

const AdminDollarSetModal = () => {
	const [loading, setLoading] = useState(false);
	const { dollarAmountData, refetch, isLoading } = GetAdminDollarSetData();

	const initialState = {
		amount: '',
	};
	const reducer = (state, action) => {
		switch (action.type) {
			case 'INPUT':
				return {
					...state,
					[action.payload.name]: action.payload.value,
				};
			case 'API_DATA':
				return {
					...action.payload,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await http.post('/admin/doller-price-store', state);

			if (data?.data?.data !== 'success') {
				tost(data?.data?.data.name[0]);
			} else if (data?.data?.data === 'success') {
				refetch();
				tost(data?.data.message);
			}
			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
		setLoading(false);
	};

	return (
		<div
			className="modal fade"
			id="exampleModal"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				{isLoading ? (
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Update Dollar
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<EditLoader />
						</div>
					</div>
				) : (
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Update Dollar
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmitData}>
								<div className="modal-body px-4">
									<div className="row mb-2">
										<div className="col-lg-12">
											<div className="form-group mb-4 position-relative">
												<InputEdit
													defaultValue={dollarAmountData?.amount}
													type="text"
													name={'amount'}
													label={'Amount'}
													require={true}
													dispatch={dispatch}
													dispatch_type={'INPUT'}
													id={'admin-add-affiliates-name'}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer px-4">
									<Link
										to={'/admin/missions'}
										className="btn btn-secondary btn-pill"
										data-bs-dismiss="modal"
									>
										Cancel
									</Link>
									<button
										disabled={loading}
										type="submit"
										data-bs-dismiss="modal"
										className="btn btn-primary btn-pill d-flex align-items-center"
									>
										<span style={{ marginRight: '2px' }}>Update Dollar</span>{' '}
										{loading && <ClockLoader color="#fff" size={15} />}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminDollarSetModal;
