import React, { useEffect, useState } from 'react';
import { http } from '../../../../../components/action/axiosInstance';
// import { IconPicker } from 'react-fa-icon-picker';
import { Link } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import tost from '../../../../../components/action/tost';
import { useReducer } from 'react';
import InputEdit from '../../../../../components/formComponent/InputEdit';
import EditLoader from '../../../../../components/loader/EditLoader';

const FooterModal = ({ clickId, footerRefetch }) => {
	const [modalData, setModalData] = useState({});
	const [loading, setLoading] = useState(false);
	const [loadingData, setLoadingData] = useState(false);

	const initialState = {
		icon_class: 'FaAdobe',
		media_link: '',
	};
	const reducer = (state, action) => {
		switch (action.type) {
			case 'INPUT':
				return {
					...state,
					[action.payload.name]: action.payload.value.trim()
						? action.payload.value
						: '',
				};
			case 'API_DATA':
				return {
					icon_class: action?.payload?.icon_class || 'FaAdobe',
					media_link: action?.payload?.media_link,
				};
			default:
				return state;
		}
	};

	useEffect(() => {
		const getDataEditData = async () => {
			setLoadingData(true);
			const res = await http.get(`/admin/footer-media/${clickId}`);
			setModalData(res?.data?.datas);
			dispatch({ type: 'API_DATA', payload: res?.data?.datas });
			setLoadingData(false);
		};
		getDataEditData();
	}, [clickId]);

	const [state, dispatch] = useReducer(reducer, initialState);

	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data = await http.put(`/admin/footer-media/${clickId}`, state);

			if (data.data.status === 400) {
				tost(data?.data?.errors.name[0]);
			} else if (data.data.status === 200) {
				footerRefetch();
				tost(data?.data.message);
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
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
				{loadingData ? (
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="staticBackdropLabel">
								Update Social Media
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
								Update Social Media
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
													defaultValue={state?.media_link}
													type="text"
													name={'media_link'}
													label={'Title'}
													require={true}
													dispatch={dispatch}
													placeholder={'Title'}
													dispatch_type={'INPUT'}
													id={'admin-add-affiliates-name'}
												/>
											</div>
										</div>

										<div className="col-lg-12 mb-3">
											<label htmlFor="">Icon</label>
											{/* <IconPicker
												value={state?.icon_class}
												onChange={(e) =>
													dispatch({
														type: 'INPUT',
														payload: {
															name: 'icon_class',
															value: e,
														},
													})
												}
											/> */}
										</div>
									</div>
								</div>
								<div className="modal-footer px-4">
									<Link
										className="btn btn-secondary btn-pill"
										data-bs-dismiss="modal"
									>
										Cancel
									</Link>
									<button
										disabled={Object.values(state).some(
											(e) => e === '' || e === null
										)}
										type="submit"
										data-bs-dismiss="modal"
										className="btn btn-primary btn-pill d-flex align-items-center"
									>
										<span style={{ marginRight: '2px' }}>Update</span>{' '}
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

export default FooterModal;
