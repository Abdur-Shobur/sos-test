import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import InputEdit from '../../../components/formComponent/InputEdit';
import { ClockLoader } from 'react-spinners';
import EditLoader from '../../../components/loader/EditLoader';
import { useState } from 'react';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import { useReducer } from 'react';
import {
	GetVendorCategoryAndSub,
	GetVendorSingleServiceData,
} from '../../../api/admin/vendorApi';
import tost from '../../../components/action/tost';
import Category from './own-components/Category';
import SubCategory from './own-components/SubCategory';
import CreatableSelect from 'react-select/creatable';
import TextAreaEdit from '../../../components/formComponent/TextAreaEdit';
import VendorAddImagePreview from '../../admin-dashboard/vendor/own-components/VendorAddImagePreview';
import { IMG_PATH } from '../../../components/env';
import { initialState, reducer } from './action/serviceUpdateAction';
import ServiceUpdate2 from './ServiceUpdate2';
import { MdCancel } from 'react-icons/md';
import { alert } from '../../../components/action/actions';
const VendorServiceUpdate = () => {
	const [loading, setLoading] = useState(false);
	const { id } = useParams();

	const { categoryAndSubData, isLoading: CategoryLoading } =
		GetVendorCategoryAndSub();

	const { serviceSingleData, isLoading, refetch } =
		GetVendorSingleServiceData(id);
	const [state, dispatch] = useReducer(reducer, initialState);
	const optionsMetaKey = state.data.tags?.map((item) => ({
		value: item,
		label: item,
	}));

	const handleChangeMeta = (newValue, actionMeta) => {
		if (actionMeta.action === 'create-option') {
			dispatch({
				type: 'TAGS_CHANGE_META',
				payload: newValue,
			});
		} else {
			dispatch({
				type: 'TAGS_CHANGE_META',
				payload: newValue,
			});
		}
	};
	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: serviceSingleData,
		});
	}, [serviceSingleData]);

	useEffect(() => {
		if (categoryAndSubData) {
			dispatch({
				type: 'CATEGORY_DISPATCH_API',
				payload: categoryAndSubData,
			});
		}
	}, [categoryAndSubData]);

	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { data } = { ...state };
		const { packages } = data;

		const formDataA = {
			service_category_id: data.service_category_id,
			service_sub_category_id: data.service_sub_category_id,
			title: data.title,
			tags: data.tags,
			description: data.description,
			contract: data.contract,
			commission: data.commission,
			commission_type: data.commission_type,
			image: data.image_file ? data.image_file : null,
			images: data.images_update
				? data.images_update?.map((e) => e.file)
				: null,
			package_description: [
				packages.package_description__1 || null,
				packages.package_description__2 || null,
				packages.package_description__3 || null,
			],
			revision_max_time: [
				packages.revision_max_time__1 || null,
				packages.revision_max_time__2 || null,
				packages.revision_max_time__3 || null,
			],
			time: [
				packages.times__1 || null,
				packages.times__2 || null,
				packages.times__3 || null,
			],
			price: [
				packages.price__1 || null,
				packages.price__2 || null,
				packages.price__3 || null,
			],
			package_title: [
				packages.package_title__1 || null,
				packages.package_title__2 || null,
				packages.package_title__3 || null,
			],
		};
		if (formDataA.image === null) {
			delete formDataA.image;
		}
		if (formDataA.images === null) {
			delete formDataA.images;
		}

		console.log(formDataA);
		try {
			const data = await http.post(
				`/main-services/${id}`,
				{ ...formDataA, _method: 'PATCH' },
				multipartConfig
			);
			console.log(data, 'API RES');
			if (data.data.message === 'Validation errors') {
				dispatch({
					type: 'API_RESPONSE',
					payload: data.data.data,
				});
				setLoading(false);
				tost('Validation Error!');

				return;
			}
			if (data.data.message === 'Updated successfull!') {
				refetch();
				// dispatch({
				// 	type: 'RESET',
				// });
				tost(data?.data.message);
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert('Error', error.message);
		}
	};

	return (
		<div style={{ margin: '20px' }}>
			<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
				<div>
					<h1>Update Service</h1>
					<p className="breadcrumbs">
						<span>
							<a href="/">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Service
					</p>
				</div>
				<div>
					<Link
						className="btn btn-primary"
						to="/vendors-dashboard/all-services"
					>
						See All
					</Link>
				</div>
			</div>

			<form onSubmit={handleSubmitData} className="ec-cat-form shadow">
				<div>
					<div className="modal-header px-4">
						<h5 className="modal-title" id="exampleModalCenterTitle">
							Basic Information
						</h5>
					</div>
					{isLoading || CategoryLoading ? (
						<EditLoader />
					) : (
						<>
							<div className="modal-body px-4">
								<div className="row mb-2">
									{/* <SubCategory dispatch={dispatch} state={state} /> */}
									<Category
										dispatch={dispatch}
										data={state.data.service_category_id}
										error={state.apiRes.service_category_id}
										options={state.data.categoryAndSubData}
									/>
									<SubCategory
										dispatch={dispatch}
										subCategory={state.data.subCategoryData}
										error={state.apiRes.service_sub_category_id}
										data={state.data.service_sub_category_id}
										categoryID={state.data.service_category_id}
									/>
									<div className="col-lg-6">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												defaultValue={state.data.title}
												type="text"
												name={'title'}
												label={'Title'}
												require={true}
												dispatch={dispatch}
												placeholder={'Title'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={
													state.apiRes.title ? state.apiRes.title[0] : null
												}
											/>
										</div>
									</div>
									<div className="col-lg-6 mb-3">
										<label className="form-label">
											Tags{' '}
											{state.apiRes.tags && (
												<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
													({state.apiRes.tags[0]})
												</span>
											)}
										</label>
										<CreatableSelect
											options={optionsMetaKey}
											value={optionsMetaKey}
											// className={`border-none-custom-css extra_css_for_design}`}
											className={`border-none-custom-css extra_css_for_design ${
												state.apiRes.tags && 'error'
											}`}
											isMulti
											name="tags"
											onChange={handleChangeMeta}
										/>
									</div>
									<div className="col-md-12 mb-3">
										<TextAreaEdit
											defaultValue={state.data.description}
											row={2}
											name={'description'}
											label={'Description'}
											dispatch={dispatch}
											error={
												state.apiRes.description
													? state.apiRes.description[0]
													: null
											}
										></TextAreaEdit>
									</div>
									<div className="col-lg-6">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												defaultValue={state.data.contract}
												type="text"
												name={'contract'}
												label={'Contract'}
												require={true}
												dispatch={dispatch}
												placeholder={'facebook.com'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={state.apiRes.contract}
											/>
										</div>
									</div>
									<div className="col-lg-6 position-relative">
										<div className="form-group row">
											<label>
												Image{' '}
												{state.apiRes.image && (
													<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
														({state.apiRes.image[0]})
													</span>
												)}
											</label>
											<VendorAddImagePreview
												dispatch={dispatch}
												multi={true}
												name="image_file"
												url_name="image_file_url"
												data={
													state.data.image_file_url
														? state.data.image_file_url
														: IMG_PATH + '/' + state.data.image_path
												}
											/>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="form-group mb-4 position-relative">
											<InputEdit
												defaultValue={state.data.commission}
												type="text"
												name={'commission'}
												label={'Commission'}
												require={true}
												dispatch={dispatch}
												placeholder={'Commission'}
												dispatch_type={'INPUT'}
												id={'admin-add-affiliates-name'}
												error={state.apiRes.commission}
											/>
										</div>
									</div>
									<div className="col-lg-6 position-relative mb-3">
										<label for="parent-category">
											<span>Commission Type </span>
											<span>
												Category{' '}
												{state.apiRes.commission_type && (
													<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
														({state.apiRes.commission_type[0]})
													</span>
												)}
											</span>{' '}
										</label>
										<div>
											<select
												style={{
													border:
														state.apiRes.commission_type && '1px solid #ffa7a7',
												}}
												id="parent-category"
												name="commission_type"
												className="custom-select"
												onChange={(e) => {
													dispatch({
														type: 'INPUT',
														payload: {
															name: 'commission_type',
															value: e.target.value,
														},
													});
												}}
											>
												<option
													selected={state.data.commission_type === 'flat'}
													value={'flat'}
												>
													flat
												</option>
												<option
													selected={state.data.commission_type === 'percentage'}
													value={'percentage'}
												>
													percentage
												</option>
											</select>
										</div>
									</div>
									<div className="col-12">
										<p className="mb-3">
											Images
											{state.apiRes.commission_type ? (
												<span style={{ fontSize: '10px', color: '#ff4e4e' }}>
													({state.apiRes.commission_type[0]})
												</span>
											) : (
												<span style={{ fontSize: '10px' }}>
													(You can choose multiple images)
												</span>
											)}
										</p>
										<div className="form-group mb-6 advertiser_store_image_preview">
											<div className="custom-file">
												<input
													type="file"
													multiple
													onChange={(e) =>
														dispatch({
															type: 'MULTI_FILE',
															payload: {
																name: e.target.name,
																value: e.target.files,
																url: 'images_url',
															},
														})
													}
													name="images_update"
													className="custom-file-input"
													id="coverImage"
													accept="image/*"
												/>
												<label
													className="custom-file-label"
													htmlFor="coverImage"
												>
													Choose file...
												</label>
											</div>
											<div className="pre_imag-view">
												{state.data.serviceimages?.map((e) => (
													<div key={e.id} className="position-relative">
														<button
															type="button"
															className="btn btn-sm btn-danger position-absolute"
														>
															<MdCancel style={{ fontSize: '18px' }} />
														</button>
														<img src={IMG_PATH + '/' + e?.images} alt="asdad" />
													</div>
												))}
												{state.data.images_url?.map((e, i) => (
													<div key={e.id} className="position-relative">
														<button
															onClick={() =>
																dispatch({
																	type: 'DELETE_MULTI_IMAGE',
																	payload: e.id,
																})
															}
															type="button"
															className="btn btn-sm btn-danger position-absolute"
														>
															<MdCancel style={{ fontSize: '18px' }} />
														</button>
														<img src={e.url} alt="asdad" />
													</div>
												))}
											</div>
										</div>
									</div>
									<ServiceUpdate2 state={state} dispatch={dispatch} />
								</div>
							</div>
							<div className="modal-footer px-4">
								<Link
									to={'/vendors-dashboard/all-services'}
									className="btn btn-secondary btn-pill"
								>
									Cancel
								</Link>
								{/* <Link to={"/vendors-dashboard/create-services-packageInfo"}> */}

								<button
									disabled={loading}
									type="submit"
									className="btn btn-primary btn-pill d-flex align-items-center"
								>
									<span style={{ marginRight: '2px' }}>Saves & Continue</span>{' '}
									{loading && <ClockLoader color="#fff" size={15} />}
								</button>
								{/* </Link> */}
							</div>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

export default VendorServiceUpdate;
