import React, { useReducer, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import edit from '../../../assets/img/icons/edit.svg';
import venderUploadPreview from '../../../assets/img/products/vender-upload-preview.jpg';
import preview from '../../../assets/img/products/vender-upload-thumb-preview.jpg';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';

import {
	http,
	multipartConfig,
} from '../../../components/action/axiosInstance';
import { reducer } from '../../../components/action/reducerAction';
import InputMain from '../../../components/formComponent/InputMain';
import TextArea from '../../../components/formComponent/TextArea';
import ProductSpecificationAdd from './ProductSpecificationAdd';
import SelectFieldsInc from './components/FieldIncrementSelect/SelectFieldsInc';
import { MyApiFun } from './components/FieldIncrementSelect/action';
import { useEffect } from 'react';
import ProductLoading from './components/common/ProductLoading';
import style from './components/style.module.css';
import Breadcrumb from './components/product-edit/Breadcrumb';
import tost from '../../../components/action/tost';
import { ClockLoader } from 'react-spinners';
import {
	BrandData,
	Category,
	Color,
	Size,
	SubCategory,
} from '../../../components/action/getDataApi';
import ReachTextEditor from '../../../components/reacth-text-editor/ReachTextEditor';
import { Helmet } from 'react-helmet';
import swal from 'sweetalert';

function VendorProductAdd() {
	// const [longValue, setValue] = useState('');
	const [load, setLoad] = useState(false);
	const [categoryID, setCategoryID] = useState(null);

	const navigate = useNavigate();

	// get brand
	const { brands, brandsIsLoading } = BrandData();
	// get all category

	const { category, isLoadingCategory } = Category();
	const { subCategory: subCategoryData = [], isLoadingSubCategory } =
		SubCategory(categoryID);

	// get color
	const { colors: color, isLoadingColor } = Color();
	// get size
	const { sizes: size, isLoadingSize } = Size();

	// get data
	const initialState = { discount_type: 'flat' };
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'INPUT',
			payload: {
				name: 'subcategory_id',
				value: subCategoryData?.[0]?.id || null,
			},
		});
	}, [subCategoryData]);
	// multi image
	const [multiFile, setMultiFile] = useState([]);
	const [multiFile_image, setMultiFile_image] = useState([]);
	function getMultiImage(e) {
		const file = e.target.files;
		for (let i = 0; i < file.length; i++) {
			setMultiFile_image((pre) => [...pre, e.target.files[i]]);
			setMultiFile((pre) => [...pre, URL.createObjectURL(file[i])]);
		}
	}

	// for get specification filed data
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

	const initialStateSelect = {
		selected: [{ name: null, itemID: null, id: 1, qty: null }],
		apiDataColor: [],
		apiDataSize: [],
	};

	const [incFieldStateColor, incSelectDisColor] = useReducer(
		MyApiFun(initialStateSelect).reducer,
		initialStateSelect
	);

	useEffect(() => {
		incSelectDisColor({
			type: 'GET_DATA_FROM_API',
			payload: {
				selected: [
					{
						size_name: null,
						size_id: null,
						color_name: null,
						color_id: null,

						id: 1,
						qty: null,
					},
				],
				apiDataSize: size,
				apiDataColor: color,
			},
		});
	}, [size, color]);

	const value = incFieldStateColor.selected.filter(
		(e) => e.qty !== '' && e.qty !== null
	);
	const qtyTotal = value
		?.map((e) => parseInt(e.qty))
		?.reduce((pre, cur) => pre + cur, 0);

	useEffect(() => {
		dispatch({
			type: 'INPUT',
			payload: {
				name: 'qty',
				value: qtyTotal,
			},
		});
	}, [qtyTotal]);

	const submit_data = async (e) => {
		e.preventDefault();
		setLoad(true);

		swal({
			title: 'Product Upload',
			text: 'Do you Want to upload your product?',
			icon: 'info',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				http
					.post(
						`/vendor-store-product`,
						{
							...state,
							images: multiFile_image,
							specification_ans: getFields.fields?.map(
								(e) => e.specification_ans
							),
							specification: getFields.fields?.map((e) => e.specification),
							variants: incFieldStateColor.selected
								.filter((e) => e.qty !== '' && e.qty !== null)
								.filter(
									(x) =>
										(x.color_name !== null && x.size_name !== null) ||
										(x.color_name !== null && x.size_name === null) ||
										(x.color_name !== null && x.size_name !== null)
								),
						},
						multipartConfig
					)
					.then((res) => {
						if (res.data.status === 200) {
							setLoad(false);
							navigate('/vendors-dashboard/product-list/all');
							tost(res.data.message, 500);
						} else {
							setLoad(false);
							let err_message =
								Object.keys(res.data.errors)[0] +
								' : ' +
								Object.values(res.data.errors)[0][0];
							tost(err_message, 8000);
						}
					})
					.catch((err) => {
 						setLoad(false);
						tost(err.message, false);
					});
			} else {
				setLoad(false);
			}
		});
	};
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div className="ec-content-wrapper">
			<Helmet>
				<title>Vendor Add Product-SOS</title>
			</Helmet>
			<div className="content">
				<Breadcrumb Text={'Add'} />
				<div data-aos="fade" className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-header card-header-border-bottom">
								<h2>Add Product</h2>
							</div>
							{brandsIsLoading ||
							isLoadingCategory ||
							isLoadingColor ||
							isLoadingSize ||
							isLoadingSubCategory ? (
								<div className="d-flex justify-content-center align-items-center h-100 w-100">
									<ProductLoading />
								</div>
							) : (
								<div className="card-body">
									<form
										onSubmit={submit_data}
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
																	src={state.url || venderUploadPreview}
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
													{/* product name  */}
													<div className="col-md-6">
														<InputMain
															dispatch={dispatch}
															dispatch_type="INPUT"
															label="Product Name"
															name="name"
															placeholder="Add Product Name"
															require={true}
															type="input"
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
															<option selected>------</option>
															{brands?.map((e, i) => (
																<option value={e?.id} key={e.id}>
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
															<option disabled selected>
																-------
															</option>
															{category?.map((e, i) => (
																<option key={e.id} value={e.id}>
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
															{Array.isArray(subCategoryData) &&
																subCategoryData?.map((e, i) => (
																	<option value={e?.id} key={e.id}>
																		{e?.name}
																	</option>
																))}
														</select>
													</div>

													{/* color size  */}
													<div
														className="col-md-6 mb-3"
														style={{
															border: '1px solid #eaeaea',
															borderRadius: '10px',
														}}
													>
														<label className="form-label">Color & Size</label>
														<SelectFieldsInc
															state={incFieldStateColor}
															dispatch={incSelectDisColor}
															dispatchQty={dispatch}
														/>
													</div>

													{/* Quantity */}
													{qtyTotal > 0 ? (
														<div className={`col-md-6 ${style.remove_qty}`}>
															<label>
																Quantity Total{' '}
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
															<InputMain
																dispatch={dispatch}
																dispatch_type="INPUT"
																label={'Quantity'}
																name="qty"
																placeholder="Add Quantity"
																require={true}
																type="number"
															/>
														</div>
													)}

													{/* original price  */}
													<div className="col-md-6">
														<InputMain
															dispatch={dispatch}
															dispatch_type="INPUT"
															label={'Original Price'}
															name="original_price"
															placeholder="Original Price"
															require={true}
															type="number"
														/>
													</div>

													{/* sell price  */}
													<div className="col-md-6">
														{/* <InputMain
															dispatch={dispatch}
															dispatch_type="INPUT"
															label={'Selling price'}
															name="selling_price"
															placeholder="Selling Price"
															require={true}
															type="number"
														/> */}
														<label htmlFor="selling_price">Selling price</label>
														<input
															onChange={(e) => {
																dispatch({
																	type: 'INPUT',
																	payload: {
																		name: e.target.name,
																		value: parseInt(e.target.value),
																	},
																});
															}}
															required
															type="number"
															id="selling_price"
															name="selling_price"
															placeholder="Selling Price"
															className="form-control"
															autoComplete={'off'}
														/>
													</div>

													{/* <div className="col-md-6 mb-3">
													<label className="form-label">Size</label>
													<SelectFieldsInc
														state={incFieldState}
														dispatch={incSelectDis}
													/>
												</div> */}

													{/* multiselect size  */}
													{/* <div className="col-md-6 mb-3">
													<label className="form-label">Size</label>

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
												</div> */}

													{/* shot dec  */}
													<div className="col-md-12">
														<TextArea
															dispatch={dispatch}
															label="Sort Description"
															name="short_description"
															row={2}
														/>
													</div>

													{/* Long Description */}
													{/* <div className="col-md-6">
													<TextArea
														dispatch={dispatch}
														label="Long Description"
														name="long_description"
														row={2}
													/>
												</div> */}
													<div className="col-md-12">
														<label htmlFor="">Long Description</label>
														<ReachTextEditor
															value={state.long_description}
															dispatch={dispatch}
														/>
													</div>

													{/* Meta Title */}
													<div className="col-md-6">
														<InputMain
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
															isMulti
															name="tags"
															onChange={(e) =>
																dispatch({
																	type: 'META_KEY',
																	payload: e,
																})
															}
														/>
													</div>

													{/* Meta description */}
													<div className="col-md-12">
														<TextArea
															dispatch={dispatch}
															label="Meta description"
															name="meta_description"
															row={4}
														/>
													</div>

													{/* <ProductSpecification /> */}
													<div className="col-md-12">
														<ProductSpecificationAdd
															dispatch={action}
															state={getFields}
														/>
													</div>

													{/* Commission Type */}
													<div className="col-md-6 mt-5">
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
															<option value="flat">Flat</option>
															<option value="percent">Percent (%)</option>
														</select>
													</div>

													{/* commission rate */}
													<div className="col-md-6 mt-5">
														<InputMain
															dispatch={dispatch}
															dispatch_type="INPUT"
															label="Discount"
															name="discount_rate"
															placeholder="10"
															require={true}
															type="number"
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
																Upload Product
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

export default VendorProductAdd;
