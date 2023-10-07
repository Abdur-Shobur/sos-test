import React, { useState } from 'react';
import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';
import { Link } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import tost from '../../../../components/action/tost';
import { useReducer } from 'react';
import TextAreaEdit from '../../../../components/formComponent/TextAreaEdit';
import VendorAddImagePreview from '../../vendor/own-components/VendorAddImagePreview';
import { Helmet } from 'react-helmet';
import { GetAdminHomeSettingData } from '../../../../api/admin/apiAdmin';
import InputEdit from '../../../../components/formComponent/InputEdit';
// import { IconPicker } from 'react-fa-icon-picker';
import EditLoader from '../../../../components/loader/EditLoader';
import { initialState, reducer } from './home.actions';
import { removeNullAndDelete_urlObj } from '../../../../components/action/actions';

const HomeContent = () => {
	const [loading, setLoading] = useState(false);
	const { homeData, refetch, isLoading } = GetAdminHomeSettingData();
	const [state, dispatch] = useReducer(reducer, initialState);

	const values = removeNullAndDelete_urlObj(state);
	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await http.post(
				`/admin/settings-update/1`,
				{ ...values, _method: 'POST' },
				multipartConfig
			);

			if (data.status === 400) {
				tost(data?.data?.errors.name[0]);
			} else if (data.status === 200) {
				tost(data?.data.message);
				refetch();
			}

			e.target.reset();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			tost('try later, something is wrong');
		}
	};

	// console.log(state);

	return (
		<div>
			{isLoading ? (
				<div style={{ display: 'block' }} className="modal-header px-4">
					<h5
						style={{
							fontSize: '28px',
							fontWeight: 'bold',
						}}
						className="modal-title"
						id="exampleModalCenterTitle"
					>
						Update Home Content
					</h5>
					<EditLoader />
				</div>
			) : (
				<form
					onSubmit={handleSubmitData}
					style={{ maxWidth: '90%', margin: '20px auto' }}
					className="ec-cat-form shadow p-lg-4 p-2"
				>
					<Helmet>
						<title>Update Home Content-SOS</title>
					</Helmet>
					<div className="modal-header px-4">
						<h5
							style={{
								fontSize: '28px',
								fontWeight: 'bold',
							}}
							className="modal-title"
							id="exampleModalCenterTitle"
						>
							Update Home Content
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							{/* home banner start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'home_banner_heading'}
										label={'Banner Header'}
										dispatch={dispatch}
										defaultValue={homeData?.home_banner_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Banner Description'}
										name={'home_banner_description'}
										dispatch={dispatch}
										defaultValue={homeData?.home_banner_description}
										placeholder={'Email'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* home banner end */}

							{/* home service start */}

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'service_one_title'}
										label={'Service Title'}
										dispatch={dispatch}
										defaultValue={homeData?.service_one_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'service_one_heading'}
										label={'Service Header'}
										dispatch={dispatch}
										defaultValue={homeData?.service_one_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* home service end */}

							{/* home organization start */}
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'org_one_title'}
										label={'Organization Title'}
										dispatch={dispatch}
										defaultValue={homeData?.org_one_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'org_one_heading'}
										label={'Organization Header'}
										dispatch={dispatch}
										defaultValue={homeData?.org_one_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group row mb-2">
									<label htmlFor="">Orgnizatin Image as</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										// data={ImagePreview(state?.about_banner_image_url)}
										// data={`${process.env.REACT_APP_IMG_URL}/${state.org_one_photo_url}`}
										data={
											state.org_one_photo_url
												? state.org_one_photo_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData.org_one_photo}`
										}
										// data={
										//   state?.org_photo_url || state.org_photo_url !== undefined
										//     ? state.org_photo_url
										//     : state.org_photo === null
										//     ? preview
										//     : `${process.env.REACT_APP_IMG_URL}/${state.org_photo}`
										// }
										multi={true}
										url_name={'org_one_photo_url'}
										name="org_one_photo"
										accept="image/png, image/jpeg, image/jpg"
									/>
								</div>
							</div>
							{/* home organization end */}

							{/* count section start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_one'}
										label={'Client Count'}
										dispatch={dispatch}
										defaultValue={homeData?.count_one}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'one_title'}
										label={'Client Status'}
										dispatch={dispatch}
										defaultValue={homeData?.one_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_two'}
										label={'Projects Count'}
										dispatch={dispatch}
										defaultValue={homeData?.count_two}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_two_title'}
										label={'Projects Status'}
										dispatch={dispatch}
										defaultValue={homeData?.count_two_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_three'}
										label={'Rating Count'}
										dispatch={dispatch}
										defaultValue={homeData?.count_three}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_three_title'}
										label={'Rating Status'}
										dispatch={dispatch}
										defaultValue={homeData?.count_three_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_four'}
										label={'Company Start Count'}
										dispatch={dispatch}
										defaultValue={homeData?.count_four}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'count_four_title'}
										label={'Company Status'}
										dispatch={dispatch}
										defaultValue={homeData?.count_four_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* count section end */}

							{/* service two start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'service_two_title'}
										label={'Service Two Title'}
										dispatch={dispatch}
										defaultValue={homeData?.service_two_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'service_two_heading'}
										label={'Service Two Header'}
										dispatch={dispatch}
										defaultValue={homeData?.service_two_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* service two end */}

							{/* organization two start */}
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'org_title'}
										label={'Organization Two Title'}
										dispatch={dispatch}
										defaultValue={homeData?.org_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'org_heading'}
										label={'Organization Two Header'}
										dispatch={dispatch}
										defaultValue={homeData?.org_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<label htmlFor="">Organization Two Image</label>
								<div className="form-group row mb-2">
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.org_photo_url
												? state.org_photo_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData.org_photo}`
										}
										multi={true}
										url_name={'org_photo_url'}
										name="org_photo"
										accept="image/png, image/jpeg, image/jpg"
									/>
								</div>{' '}
							</div>
							{/* organization two end */}

							{/* chosse us start */}
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_us_title'}
										label={'Choose Us Title'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_us_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_us_heading'}
										label={'Choose Us Header'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_us_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Choose Us Description'}
										name={'chose_description'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* chosse us end */}

							{/* progress start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progress_title'}
										label={'Progress One'}
										dispatch={dispatch}
										defaultValue={homeData?.progress_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progress_value'}
										label={'Progress One Value'}
										dispatch={dispatch}
										defaultValue={homeData?.progress_value}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progres_two_title'}
										label={'Progress Two'}
										dispatch={dispatch}
										defaultValue={homeData?.progres_two_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progres_two_value'}
										label={'Progress Two Value'}
										dispatch={dispatch}
										defaultValue={homeData?.progres_two_value}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progres_three_title'}
										label={'Progress three'}
										dispatch={dispatch}
										defaultValue={homeData?.progres_three_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progres_three_value'}
										label={'Progress Three Value'}
										dispatch={dispatch}
										defaultValue={homeData?.progres_three_value}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progres_four_title'}
										label={'Progress Four'}
										dispatch={dispatch}
										defaultValue={homeData?.progres_four_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'progres_four_value'}
										label={'Progress Four Value'}
										dispatch={dispatch}
										defaultValue={homeData?.progres_four_value}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* progress end */}

							{/* choose card start */}
							{/* card 1 */}
							<div className="col-lg-2 mb-3">
								<label htmlFor="">Icon</label>
								<IconPicker
									value={
										state.chose_card_one_icon
											? state?.chose_card_one_icon
											: homeData?.chose_card_one_icon
									}
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: 'chose_card_one_icon',
												value: e,
											},
										})
									}
								/>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_card_one_title'}
										label={'Choose Card Title'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_one_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Choose Card Description'}
										name={'chose_card_one_description'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_one_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* card 2 */}
							<div className="col-lg-2 mb-3">
								<label htmlFor="">Icon</label>
								<IconPicker
									value={
										state.chose_card_two_icon
											? state?.chose_card_two_icon
											: homeData?.chose_card_two_icon
									}
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: 'chose_card_two_icon',
												value: e,
											},
										})
									}
								/>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_card_two_title'}
										label={'Choose Card Two Title'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_two_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Choose Card Two Description'}
										name={'chose_card_two_description'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_two_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* card 3 */}
							<div className="col-lg-2 mb-3">
								<label htmlFor="">Icon</label>
								<IconPicker
									value={
										state.chose_card_three_icon
											? state?.chose_card_three_icon
											: homeData?.chose_card_three_icon
									}
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: 'chose_card_three_icon',
												value: e,
											},
										})
									}
								/>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_card_three_title'}
										label={'Choose Card Three Title'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_three_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Choose Card Three Description'}
										name={'chose_card_three_description'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_three_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* card 4 */}
							<div className="col-lg-2 mb-3">
								<label htmlFor="">Icon</label>
								<IconPicker
									value={
										state.chose_card_four_icon
											? state?.chose_card_four_icon
											: homeData?.chose_card_four_icon
									}
									onChange={(e) =>
										dispatch({
											type: 'INPUT',
											payload: {
												name: 'chose_card_four_icon',
												value: e,
											},
										})
									}
								/>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_card_four_title'}
										label={'Choose Card Four Title'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_four_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-5">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Choose Card Four Description'}
										name={'chose_card_four_description'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_card_four_description}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							{/* choose card end */}

							{/* our partner start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'partner_title'}
										label={'Partner Title'}
										dispatch={dispatch}
										defaultValue={homeData?.partner_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'partner_heading'}
										label={'Partner Header'}
										dispatch={dispatch}
										defaultValue={homeData?.partner_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* our partner end */}
						</div>
					</div>

					<div className="modal-footer px-4">
						<Link to={'/'} className="btn btn-secondary btn-pill">
							Cancel
						</Link>
						<button
							disabled={loading}
							type="submit"
							className="btn btn-primary btn-pill d-flex align-items-center"
						>
							<span style={{ marginRight: '2px' }}>Update Home Content</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default HomeContent;
