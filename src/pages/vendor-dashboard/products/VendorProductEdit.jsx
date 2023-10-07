/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
	BrandData,
	Category,
	Color,
	Size,
	SubCategory,
} from '../../../components/action/getDataApi';
import Aos from 'aos';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from './components/style.module.css';
import Breadcrumb from './components/product-edit/Breadcrumb';
import React, { useEffect, useReducer, useState } from 'react';
import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import ProductLoading from './components/common/ProductLoading';
import { AiFillDelete, AiFillMinusCircle } from 'react-icons/ai';
import InputEdit from '../../../components/formComponent/InputEdit';
import { initialState, reducer } from './components/product-edit/action';
import TextAreaEdit from '../../../components/formComponent/TextAreaEdit';
import { useCustomEffect } from './components/product-edit/useCustomEffect';
import preview from '../../../assets/img/products/vender-upload-thumb-preview.jpg';
import ColorSizeQtyEdit from './components/product-edit/color-size-qty/ColorSizeQtyEdit';
import { deleteImageHandler } from './components/product-edit/deleteSingleImage';
import SpecificationEdit from './components/product-edit/specification-edit/SpecificationEdit';
import CreatableSelect from 'react-select/creatable';
import tost from '../../../components/action/tost';
import { ClockLoader } from 'react-spinners';
import ReachTextEditor from '../../../components/reacth-text-editor/ReachTextEditor';
import { editIcon } from '../../../components/images/demoImage';

function VendorProductEdit() {
	const [load, setLoad] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [setRefetch, refetch] = useState(false);
	const [edit, setEdit] = useState({});

	const navigate = useNavigate();
	const location = useLocation();
	const nextUrl =
		location?.state?.from.pathname || '/vendors-dashboard/product-list/all';
	// product id
	const { id } = useParams();

	// const { editProduct, isLoading, refetch } = EditProductById(id);
	useEffect(() => {
		setIsLoading(true);
		const getDataEditData = async () => {
			const res = await http.get(`/vendor-edit-product/${id}`);
			setEdit(res?.data?.product);
			setIsLoading(false);
		};
		getDataEditData();
	}, [id, setRefetch]);

	// reducer function

	const [state, dispatch] = useReducer(reducer, initialState);
	// utility api [color, size, brand, category, sub category]
	const { colors, isLoadingColor } = Color();
	const { sizes, isLoadingSize } = Size();
	const { brands, brandsIsLoading } = BrandData();
	const { category, isLoadingCategory } = Category();
	const { subCategory = [] } = SubCategory(state.initial.category_id || null);
	const [category_id, setCategoryID] = useState(state.initial.category_id);
	// custom hook for use-effect hook for set utility in api state

	useEffect(() => {
		dispatch({
			type: 'API',
			payload: edit,
		});
	}, [edit, setRefetch]);

	useCustomEffect(
		colors,
		sizes,
		brands,
		category,
		subCategory,
		dispatch
		// editProduct
	);

	// get total value from color size and qty
	const value = state?.initial?.variants?.filter(
		(e) => e.qty !== '' && e.qty !== null
	);
	let qtyTotal = value
		?.map((e) => parseInt(e.qty))
		?.reduce((pre, cur) => pre + cur, 0);
	// if (value.length > 0) {
	// 	qtyTotal = value
	// 		?.map((e) => parseInt(e.qty))
	// 		?.reduce((pre, cur) => pre + cur, 0);
	// } else {
	// 	qtyTotal = parseInt(state.initial.qty);
	// }

	// set in initial qty field total qty
	// update new Total Qty in new state
	const [newQtyTotal, setNewQtyTotal] = useState(qtyTotal);
	useEffect(() => {
		dispatch({
			type: 'INPUT',
			payload: {
				name: 'qty',
				value: qtyTotal,
			},
		});
		setNewQtyTotal(qtyTotal);
	}, [qtyTotal]);

	// tags

	const options = state?.initial?.tags?.map((item) => ({
		value: item,
		label: item,
	}));
	const optionsMetaKey = state?.initial?.meta_keyword?.map((item) => ({
		value: item,
		label: item,
	}));
	const handleChange = (newValue, actionMeta) => {
		if (actionMeta.action === 'create-option') {
			dispatch({
				type: 'TAGS_CHANGE',
				payload: newValue,
			});
		} else {
			dispatch({
				type: 'TAGS_CHANGE',
				payload: newValue,
			});
		}
	};
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

	// form update handler

	const handleSubmit = (e) => {
		setLoad(true);
		e.preventDefault();
		http
			.post(`/vendor-update-product/${id}`, state.initial, multipartConfig)
			.then((res) => {
				if (res.data.status === 200) {
					setLoad(false);
					tost(res.data.message, false);
					navigate(nextUrl);
				} else {
					setLoad(false);
					tost(res.data.message, false);

					if (res.data.errors) {
					}
				}
			})
			.catch((er) => {
				tost(er.message, false);
				setLoad(false);
			});
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);
	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<Breadcrumb Text={'Edit'} />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-header card-header-border-bottom">
								<h2>Edit Product</h2>
							</div>
							{isLoading ||
							isLoadingCategory ||
							isLoadingColor ||
							isLoadingSize ||
							brandsIsLoading ? (
								<div className="d-flex justify-content-center align-items-center h-100 w-100">
									<ProductLoading />
								</div>
							) : (
								<div className="card-body">
									<form
										onSubmit={handleSubmit}
										className="row ec-vendor-uploads"
									>
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
																		type: 'MAIN_FILE',
																		payload: e.target.files,
																	});
																}}
															/>
															<label htmlFor="imageUpload">
																<img
																	src={editIcon}
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
																		state.initial.urlNew
																			? state.initial.urlNew
																			: `${process.env.REACT_APP_IMG_URL}/${state.initial.url}` ||
																			  preview
																	}
																	alt="edit"
																/>
															</div>
														</div>
													</div>
													<div className="thumb-upload-set colo-md-12">
														{state.initial.product_images_url?.map((u, i) => (
															<div
																key={i}
																className="thumb-upload position-relative"
															>
																<div className="thumb-preview ec-preview">
																	<div className="image-thumb-preview ">
																		<img
																			className="image-thumb-preview ec-image-preview"
																			src={
																				`${process.env.REACT_APP_IMG_URL}/${u.u}` ||
																				preview
																			}
																			alt="edit"
																		/>
																		<button
																			type="button"
																			onClick={() =>
																				deleteImageHandler(u.id, refetch)
																			}
																			className="btn btn-danger btn-sm position-absolute end-0"
																		>
																			<AiFillDelete />
																		</button>
																	</div>
																</div>
															</div>
														))}
													</div>
													<div className="thumb-upload-set colo-md-12">
														{state.initial.update_product_images_url?.map(
															(u, i) => (
																<div
																	key={i}
																	className="thumb-upload position-relative"
																>
																	<div className="thumb-preview ec-preview">
																		<div className="image-thumb-preview ">
																			<img
																				className="image-thumb-preview ec-image-preview"
																				src={u.u}
																				alt="edit"
																			/>
																			<button
																				onClick={() =>
																					dispatch({
																						type: 'DELETE_IMAGE',
																						id: u.id,
																					})
																				}
																				className="btn btn-warning btn-sm position-absolute end-0"
																			>
																				<AiFillMinusCircle />
																			</button>
																		</div>
																	</div>
																</div>
															)
														)}
														<div className="thumb-upload">
															<div className="thumb-edit">
																<input
																	type="file"
																	id="thumbUpload01"
																	multiple
																	name="image"
																	onChange={(e) =>
																		dispatch({
																			type: 'ADD_IMAGE',
																			images: e.target.files,
																		})
																	}
																	className="ec-image-upload"
																	accept=".png, .jpg, .jpeg"
																/>
																<label htmlFor="imageUpload">
																	<img
																		src={editIcon}
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
													{/* product name  */}
													<div className="col-md-6">
														<InputEdit
															dispatch={dispatch}
															label="Product Name"
															type="input"
															required={true}
															name="name"
															Placeholder="Add Product Name"
															defaultValue={state.initial.name}
														/>
													</div>

													{/* brand  */}
													<div className="col-md-6">
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
															{state?.api?.brands?.map((e, i) => (
																<option
																	// eslint-disable-next-line eqeqeq
																	selected={state.initial.brand_id == e.id}
																	value={e?.id}
																	key={i}
																>
																	{e.name}
																</option>
															))}
														</select>
													</div>

													{/* category  */}
													<div className="col-md-6">
														<label className="form-label">
															Select Categories
														</label>

														<select
															onChange={(e) => {
																dispatch({
																	type: 'INPUT',
																	payload: {
																		name: e.target.name,
																		value: e.target.value,
																	},
																});
																setCategoryID(e.target.value);
															}}
															name="category_id"
															className="form-control here set-slug"
															aria-label=".form-select-sm example"
														>
															{state?.api?.category?.map((e, i) => (
																<option
																	selected={state.initial.category_id == e.id}
																	key={i}
																	value={e.id}
																>
																	{e.name}
																</option>
															))}
														</select>
													</div>

													{/* sub category  */}
													<div className="col-md-6">
														<label className="form-label">
															Select Sub Categories
														</label>

														<select
															onChange={(e) => {
																dispatch({
																	type: 'INPUT',
																	payload: {
																		name: e.target.name,
																		value: e.target.value,
																	},
																});
															}}
															name="subcategory_id"
															className="form-control here set-slug"
															aria-label=".form-select-sm example"
														>
															{/* {state?.api?.subcategory?.map((e, i) => (
																<option value={e?.id} key={e.id}>
																	{e?.name}
																</option>
															))} */}
															{Array.isArray(state?.api?.subcategory) &&
																state?.api?.subcategory.map((e, i) => (
																	<option
																		selected={
																			e.id == state.initial.subcategory_id
																		}
																		value={e?.id}
																		key={e.id}
																	>
																		{e?.name}
																	</option>
																))}
														</select>
													</div>

													{/* color size  */}
													<div className="col-md-6 mb-3">
														<label className="form-label">Color & Size</label>
														<ColorSizeQtyEdit
															dispatch={dispatch}
															getState={state}
														/>
													</div>

													{/* Quantity */}
													{qtyTotal > 0 ? (
														<div className={`col-md-6 ${style.remove_qty}`}>
															<label>
																Quantity Total{state.initial.qty}
																<span className={style.qty_remove_hide}>
																	If you want to change qty. please remove color
																	& size qty
																</span>
															</label>

															<input
																placeholder="Add Quantity"
																className="form-control"
																value={qtyTotal}
																readOnly
															/>
														</div>
													) : (
														<div className="col-md-6">
															<label>Quantity {state?.initial?.qty}</label>
															<input
																type="number"
																placeholder="Add Quantity"
																value={state?.initial?.qty}
																name="qty"
																min={0}
																onChange={(e) => {
																	dispatch({
																		type: 'INPUT',
																		payload: {
																			name: e.target.name,
																			value:
																				parseInt(e.target.value) >= 0
																					? e.target.value
																					: null,
																		},
																	});
																	setNewQtyTotal(e.target.value);
																}}
															/>
														</div>
													)}

													{/* original price  */}
													<div className="col-md-6">
														<InputEdit
															defaultValue={state.initial.original_price}
															dispatch={dispatch}
															dispatch_type="INPUT"
															label={'Original Price ( In tk)'}
															name="original_price"
															placeholder="Original Price"
															require={true}
															type="number"
														/>
													</div>

													{/* sell price  */}
													<div className="col-md-6">
														<InputEdit
															defaultValue={state.initial.selling_price}
															dispatch={dispatch}
															dispatch_type="INPUT"
															label={'Selling price'}
															name="selling_price"
															placeholder="Selling Price"
															require={true}
															type="number"
														/>
													</div>

													{/* shot dec  */}
													<div className="col-md-12">
														<TextAreaEdit
															dispatch={dispatch}
															defaultValue={state.initial.short_description}
															label="Sort Description"
															name="short_description"
															row={2}
														/>
													</div>

													{/* Long Description */}

													<div className="col-md-12">
														<label htmlFor="">Long Description</label>
														<ReachTextEditor
															value={state.initial.long_description}
															dispatch={dispatch}
														/>
													</div>

													{/* <div className="col-md-6">
														<TextAreaEdit
															dispatch={dispatch}
															defaultValue={state.initial.long_description}
															label="Long Description"
															name="long_description"
															row={2}
														/>
													</div> */}

													{/* Meta Title */}
													<div className="col-md-6">
														<InputEdit
															defaultValue={state.initial.meta_title}
															dispatch={dispatch}
															dispatch_type="INPUT"
															label="Meta Title"
															name="meta_title"
															placeholder="Add Title"
															require={true}
															type="text"
														/>
													</div>

													{/* Meta Keyword */}

													<div className="col-md-6">
														<label className="form-label">Meta Keyword</label>

														<CreatableSelect
															className="border-none-custom-css extra_css_for_design"
															options={optionsMetaKey}
															value={optionsMetaKey}
															onChange={handleChangeMeta}
															isMulti
														/>
													</div>

													{/* Meta description */}
													<div className="col-md-12">
														<TextAreaEdit
															defaultValue={state.initial.meta_description}
															dispatch={dispatch}
															label="Meta description"
															name="meta_description"
															row={4}
														/>
													</div>

													{/* <ProductSpecification /> */}
													<div className="col-md-12">
														<SpecificationEdit
															dispatch={dispatch}
															state={state}
														/>
													</div>
													{/* Commission Type */}
													<div className="col-md-6">
														<label className="form-label">
															Commission Type
														</label>

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
															name="discount_type"
															className="form-control here set-slug"
															aria-label=".form-select-sm example"
														>
															<option
																selected={
																	state.initial.discount_type === 'flat'
																}
																value="flat"
															>
																Flat
															</option>
															<option
																selected={
																	state.initial.discount_type === 'percent'
																}
																value="percent"
															>
																Percent
															</option>
														</select>
													</div>
													{/* commission rate */}
													<div className="col-md-6">
														<InputEdit
															defaultValue={state.initial.discount_rate}
															dispatch={dispatch}
															dispatch_type="INPUT"
															label="Commission Rate"
															name="discount_rate"
															placeholder="Commission Rate"
															require={true}
															type="text"
														/>
													</div>

													{/* tag  */}
													<div className="col-md-12">
														<label className="form-label">
															Product Tags
															<span>
																( Type and make comma to separate tags )
															</span>
														</label>

														<CreatableSelect
															className="border-none-custom-css extra_css_for_design"
															options={options}
															value={options}
															onChange={handleChange}
															isMulti
														/>
													</div>

													<div className="col-md-12">
														<button
															// onClick={submit_data}
															disabled={load}
															type="submit"
															className={`btn w-100 mt-3 ${
																load ? 'btn-secondary' : 'btn-primary'
															}`}
														>
															<span style={{ marginRight: '2px' }}>
																Update Product
															</span>{' '}
															{load && <ClockLoader color="#fff" size={15} />}
														</button>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VendorProductEdit;
