import React, { useEffect, useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import edit from '../../../assets/img/icons/edit.svg';
import preview from '../../../assets/img/products/vender-upload-thumb-preview.jpg';

import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import { reducer } from '../../../components/action/reducerAction';
import InputEdit from '../../../components/formComponent/InputEdit';
import SelectEdit from '../../../components/formComponent/SelectEdit';
import TextAreaEdit from '../../../components/formComponent/TextAreaEdit';
import ProductSpecificationAdd from './ProductSpecificationAdd';
import tost from '../../../components/action/tost';

function VendorProductEdit() {
	const { id } = useParams();
	const { data: editableProductData } = useQuery(
		['edit_vendor_product_edit_data', id],
		() => {
			return http.get(`/vendor-edit-product/${id}`);
		}
	);
	const product = editableProductData?.data?.product;

	const { data } = useQuery('fetch_main_category_data', () => {
		return http.get(`/vendor-all-category`);
	});
	const category = data?.data?.category;

	// get brand
	const { data: brandData } = useQuery('fetch_main_brand_data', () => {
		return http.get(`/vendor-all/brand`);
	});
	const brand = brandData?.data?.brand;

	// get data
	const initialState = {};
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: product,
		});
	}, [product]);

	// multi image
	const [multiFile, setMultiFile] = useState([]);
	const [multiFile_image, setMultiFile_image] = useState([]);
	function getMultiImage(e) {
		const file = e.target.files;
		for (let i = 0; i < file.length; i++) {
			setMultiFile_image((pre) => [...pre, e.target.files]);
			setMultiFile((pre) => [...pre, URL.createObjectURL(file[i])]);
		}
	}

	// for get specificaiton fild data
	const currentState = {
		fields: [
			{
				id: 1,
				specification: '',
				specification_ans: '',
			},
		],
	};
	const reducerField = (state = currentState, action) => {
		switch (action.type) {
			case 'CREATE':
				return {
					...state,
					fields: [
						...state.fields,
						{
							id: state.fields[state.fields.length - 1]?.id + 1 || 1,
							specification: '',
							specification_ans: '',
						},
					],
				};

			case 'CHANGE_TEXT':
				return {
					...state,
					fields: state.fields.map((e) =>
						e.id === action.payload.id
							? { ...e, [action.payload.name]: action.payload.value }
							: { ...e }
					),
				};

			case 'DELETE':
				return {
					...state,
					fields: state.fields.filter((e) => e.id !== action.payload),
				};

			default:
				return {
					state,
				};
		}
	};
	const [getFields, action] = useReducer(reducerField, currentState);

	const submit_data = async (e) => {
		e.preventDefault();
		http
			.post(
				`/vendor-update-product/${id}`,
				{
					...state,
					images: multiFile_image,
					specification_ans: getFields.fields?.map((e) => e.specification_ans),
					specification: getFields.fields?.map((e) => e.specification),
				},
				multipartConfig
			)
			.then((res) => {
				if (res.data.status === 400) {
					let err_message =
						Object.keys(res.data.errors)[0] +
						' : ' +
						Object.values(res.data.errors)[0][0];
					tost(err_message);
				}
			})
			.catch((err) => {
				tost(err.message);
			});
	};

	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper d-flex align-items-center justify-content-between">
					<div>
						<h1>Add Product</h1>
						<p className="breadcrumbs">
							<span>
								<a href="index.html">Home</a>
							</span>
							<span>
								<i className="mdi mdi-chevron-right"></i>
							</span>
							Product
						</p>
					</div>
					<div>
						<Link
							to={`/vendors-dashboard/product-list`}
							className="btn btn-primary"
						>
							View All
						</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-header card-header-border-bottom">
								<h2>Add Product</h2>
							</div>

							<div className="card-body">
								<form onSubmit={submit_data} className="row ec-vendor-uploads">
									<div className="col-lg-4">
										<div className="ec-vendor-img-upload">
											<div className="ec-vendor-main-img">
												<div className="avatar-upload">
													<div className="avatar-edit">
														<input
															type="file"
															id="imageUpload"
															className="ec-image-upload"
															accept=".png, .jpg, .jpeg"
															onChange={(e) => {
																dispatch({
																	type: 'FILE',
																	payload: e.target.files,
																});
															}}
														/>
														<label htmlFor="imageUpload">
															<img
																src={edit}
																className="svg_img header_svg"
																alt="edit"
															/>
														</label>
													</div>
													<div className="avatar-preview ec-preview">
														<div className="imagePreview ec-div-preview">
															<img
																className="ec-image-preview"
																src={
																	state.url ||
																	`${process.env.REACT_APP_IMG_URL}/${state?.image}`
																}
																alt="edit"
															/>
														</div>
													</div>
												</div>
												<div className="thumb-upload-set colo-md-12">
													{multiFile?.map((e, i) => (
														<div key={i} className="thumb-upload">
															<div className="thumb-preview ec-preview">
																<div className="image-thumb-preview">
																	<img
																		className="image-thumb-preview ec-image-preview"
																		src={e}
																		alt="edit"
																	/>
																</div>
															</div>
														</div>
													))}
													<div className="thumb-upload">
														<div className="thumb-edit">
															<input
																type="file"
																id="thumbUpload01"
																multiple
																name="image"
																// onChange={(e) => {
																// 	dispatch({
																// 		type: 'MULTI_FILE_IMAGE',
																// 		payload: e.target.files,
																// 	});
																// }}
																onChange={getMultiImage}
																className="ec-image-upload"
																accept=".png, .jpg, .jpeg"
															/>
															<label htmlFor="imageUpload">
																<img
																	src={edit}
																	className="svg_img header_svg"
																	alt="edit"
																/>
															</label>
														</div>
														<div className="thumb-preview ec-preview">
															<div className="image-thumb-preview">
																<img
																	className="image-thumb-preview ec-image-preview"
																	src={preview}
																	alt="edit"
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-8">
										<div className="ec-vendor-upload-detail">
											<div className="row g-3">
												<div className="col-md-6">
													<InputEdit
														dispatch={dispatch}
														label="Product Name"
														type="input"
														required={true}
														name="name"
														Placeholder="Add Product Name"
														defaultValue={state?.name}
													/>
												</div>
												<div className="col-md-6">
													<label className="form-label">
														Select Categories
													</label>

													<select
														onChange={(e) =>
															dispatch({
																type: 'CATEGORY',
																payload: {
																	name: e.target.value.split(' ')[0],
																	value: e.target.value.split(' ')[1],
																},
															})
														}
														name="category"
														className="form-control here set-slug"
														aria-label=".form-select-sm example"
													>
														{category?.map((e, i) => (
															<>
																<option value={`category_id ${e?.id}`} key={i}>
																	<>{e.name}</>
																</option>
																{e?.subcategory?.map((j, x) => (
																	<option
																		value={`subcategory_id ${j?.id}`}
																		key={x + i}
																	>
																		--{j.name}
																	</option>
																))}
															</>
														))}
													</select>
												</div>
												<div className="col-md-12">
													<label className="form-label">Select Brand</label>

													<select
														onChange={(e) =>
															dispatch({
																type: 'INPUT',
																payload: {
																	name: e.target.name,
																	value: e.target.value,
																},
															})
														}
														name="brand_id"
														className="form-control here set-slug"
														aria-label=".form-select-sm example"
													>
														{brand?.map((e, i) => (
															<option
																selected={state?.brand_id === e?.id}
																value={e?.id}
																key={i}
															>
																{e.name}
															</option>
														))}
													</select>
												</div>
												<div className="col-md-12">
													<TextAreaEdit
														dispatch={dispatch}
														defaultValue={state?.short_description}
														label="Sort Description"
														name="short_description"
														row={2}
													/>
												</div>

												<div className="col-md-6">
													<InputEdit
														defaultValue={state?.original_price}
														dispatch={dispatch}
														dispatch_type="INPUT"
														label={'Original Price ( In USD )'}
														name="original_price"
														placeholder="Original Price"
														require={true}
														type="number"
													/>
												</div>
												<div className="col-md-6">
													<InputEdit
														defaultValue={state?.selling_price}
														dispatch={dispatch}
														dispatch_type="INPUT"
														label={'Selling price'}
														name="selling_price"
														placeholder="Selling Price"
														require={true}
														type="number"
													/>
												</div>
												<div className="col-md-6 mb-3">
													<label className="form-label">Color</label>

													{/* <Multiselect
														displayValue="name"
														className="add_rounded_style"
														options={color}
														selectedValues={state?.colors}
														onSelect={(selectedList) =>
															dispatch({
																type: 'product_color',
																payload: selectedList?.map((item) => {
																	return {
																		id: item.id,
																	};
																}),
															})
														}
														onRemove={(selectedList) => {
															dispatch({
																type: 'product_color',
																payload: selectedList?.map((item) => {
																	return {
																		id: item.id,
																	};
																}),
															});
														}}
														 
													/> */}
												</div>
												<div className="col-md-6 mb-3">
													<label className="form-label">Size</label>

													{/*
	
													<Multiselect
														displayValue="name"
														onSelect={(selectedList) =>
															dispatch({
																type: 'product_size',
																payload: selectedList?.map((item) => {
																	return {
																		id: item.id,
																	};
																}),
															})
														}
														onRemove={(selectedList) => {
															dispatch({
																type: 'product_size',
																payload: selectedList?.map((item) => {
																	return {
																		id: item.id,
																	};
																}),
															});
														}}
														className="add_rounded_style"
														options={size}
													/>
												*/}
												</div>

												<div className="col-md-6">
													<InputEdit
														defaultValue={state?.qty}
														dispatch={dispatch}
														dispatch_type="INPUT"
														label={'Quantity'}
														name="qty"
														placeholder="Add Quantity"
														require={true}
														type="number"
													/>
												</div>
												<div className="col-md-12">
													<TextAreaEdit
														defaultValue={state?.long_description}
														dispatch={dispatch}
														label="Long Description"
														name="long_description"
														row={4}
													/>
												</div>
												<div className="col-md-6">
													<InputEdit
														defaultValue={state?.meta_title}
														dispatch={dispatch}
														dispatch_type="INPUT"
														label="Meta Title"
														name="meta_title"
														placeholder="Add Title"
														require={true}
														type="text"
													/>
												</div>
												<div className="col-md-6">
													<InputEdit
														defaultValue={state?.meta_keyword}
														dispatch={dispatch}
														dispatch_type="INPUT"
														label="Meta Keyword"
														name="meta_keyword"
														placeholder="Add Keyword"
														require={true}
														type="text"
													/>
												</div>
												<div className="col-md-12">
													<TextAreaEdit
														defaultValue={state?.meta_description}
														dispatch={dispatch}
														label="Meta description"
														name="meta_description"
														row={4}
													/>
												</div>
												<div className="col-md-12">
													{/* <ProductSpecification /> */}
													<ProductSpecificationAdd
														dispatch={action}
														state={getFields}
													/>
												</div>
												<div className="col-md-12">
													<label className="form-label">
														Product Tags
														<span>
															( Type and make comma to separate tags )
														</span>
													</label>
													<CreatableSelect
														className="border-none-custom-css extra_css_for_design"
														isMulti
														name="tags"
														onChange={(e) =>
															dispatch({
																type: 'TAGS',
																payload: e,
															})
														}
													/>
												</div>
												<div className="col-md-6 mt-3">
													<SelectEdit
														defaultValue={state?.status}
														dispatch={dispatch}
													/>
												</div>
												<div className="col-md-12">
													<button
														// onClick={submit_data}
														type="submit"
														className="btn btn-primary"
													>
														Submit
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VendorProductEdit;
