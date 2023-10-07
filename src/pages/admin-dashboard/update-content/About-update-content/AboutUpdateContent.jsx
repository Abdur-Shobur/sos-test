import React, { useEffect, useState } from 'react';
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
import EditLoader from '../../../../components/loader/EditLoader';
import { initialState, reducer } from './actions';
import {
	ImagePreview,
	removeNullAndDelete_urlObj,
} from '../../../../components/action/actions';

const AboutUpdateContent = () => {
	const [loading, setLoading] = useState(false);
	const { homeData, refetch, isLoading } = GetAdminHomeSettingData();
	const [state, dispatch] = useReducer(reducer, initialState);
	const values = removeNullAndDelete_urlObj(state);
	console.log(values);
	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data = await http.post(
				`/admin/settings-update/1`,
				{ ...values, _method: 'POST' },
				multipartConfig
			);
			console.log(data);

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

			console.error(error);
		}
	};

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
					style={{ maxWidth: '95%', margin: '20px auto' }}
					className="ec-cat-form shadow p-lg-4 p-2"
				>
					<Helmet>
						<title>Update About Content-SOS</title>
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
							Update About Content
						</h5>
					</div>
					<div className="modal-body px-4">
						<div className="row mb-2">
							{/* about banner start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_title'}
										label={'Banner Title'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_heading'}
										label={'Banner Heading'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Banner Description'}
										name={'about_banner_description'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_description}
										placeholder={'Email'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group row mb-2">
									<label htmlFor="">Banner Image</label>

									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.about_banner_image_url
												? state?.about_banner_image_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.about_banner_image}`
										}
										multi={true}
										url_name={'about_banner_image_url'}
										name="about_banner_image"
									/>
								</div>
							</div>
							{/* about banner end */}

							{/* banner card start */}

							{/* card 1 */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_increment_one_count'}
										label={'Experience Count'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_increment_one_count}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_increment_one_title'}
										label={'Experience Status'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_increment_one_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							{/* card 2 */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_increment_two_count'}
										label={'Vendor Count'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_increment_two_count}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_increment_otwo_title'}
										label={'Vendor Status'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_increment_otwo_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							{/* card 3 */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_increment_othree_count'}
										label={'Affiliators Count'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_increment_othree_count}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'about_banner_increment_three_title'}
										label={'Affiliators Statud'}
										dispatch={dispatch}
										defaultValue={homeData?.about_banner_increment_three_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>

							{/* banner card end */}

							{/* our vission start */}
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'vision_title'}
										label={'Vission Title'}
										dispatch={dispatch}
										defaultValue={homeData?.vision_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'vision_heading'}
										label={'Vission Header'}
										dispatch={dispatch}
										defaultValue={homeData?.vision_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Vission Description'}
										name={'vision_description'}
										dispatch={dispatch}
										defaultValue={homeData?.vision_description}
										placeholder={'Email'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group row mb-2">
									<label htmlFor="">Vission Image</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.vision_image_one_url
												? state?.vision_image_one_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.vision_image_one}`
										}
										multi={true}
										url_name={'vision_image_one_url'}
										name="vision_image_one"
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group row mb-2">
									<label htmlFor="">Vission Image Two</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.vision_image_two_url
												? state?.vision_image_two_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.vision_image_two}`
										}
										multi={true}
										url_name={'vision_image_two_url'}
										name="vision_image_two"
									/>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="form-group row mb-2">
									<label htmlFor="">Vission Image Three</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.vision_image_three_url
												? state?.vision_image_three_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.vision_image_three}`
										}
										multi={true}
										url_name={'vision_image_three_url'}
										name="vision_image_three"
									/>
								</div>
							</div>
							{/* our vission end */}

							{/* mission start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'mission_title'}
										label={'Mission Title'}
										dispatch={dispatch}
										defaultValue={homeData?.mission_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'mission_heading'}
										label={'Mission Header'}
										dispatch={dispatch}
										defaultValue={homeData?.mission_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<TextAreaEdit
										label={'Mission Description'}
										name={'mission_description'}
										dispatch={dispatch}
										defaultValue={homeData?.mission_description}
										placeholder={'Email'}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-email'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group row mb-2">
									<label htmlFor="">Mission Image</label>
									<VendorAddImagePreview
										dispatch={dispatch}
										data={
											state.mission_image_url
												? state?.mission_image_url
												: `${process.env.REACT_APP_IMG_URL}/${homeData?.mission_image}`
										}
										multi={true}
										url_name={'mission_image_url'}
										name="mission_image"
									/>
								</div>
							</div>
							{/* mission end */}

							{/* why choose us start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_us_two_title'}
										label={'Choose Us Title'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_us_two_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'chose_us_two_heading'}
										label={'Choose Us Header'}
										dispatch={dispatch}
										defaultValue={homeData?.chose_us_two_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* why choose us end */}

							{/* testimonal start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'testimonial_title'}
										label={'Testimonial Title'}
										dispatch={dispatch}
										defaultValue={homeData?.testimonial_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'testimonial_heading'}
										label={'Testimonial Header'}
										dispatch={dispatch}
										defaultValue={homeData?.testimonial_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* testimonal end */}

							{/* member start */}
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'member_title'}
										label={'Member Title'}
										dispatch={dispatch}
										defaultValue={homeData?.member_title}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group mb-4 position-relative">
									<InputEdit
										type="text"
										name={'member_heading'}
										label={'Member Header'}
										dispatch={dispatch}
										defaultValue={homeData?.member_heading}
										dispatch_type={'INPUT'}
										id={'admin-add-affiliates-name'}
									/>
								</div>
							</div>
							{/* member end */}
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
							<span style={{ marginRight: '2px' }}>Update About Content</span>{' '}
							{loading && <ClockLoader color="#fff" size={15} />}
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default AboutUpdateContent;
