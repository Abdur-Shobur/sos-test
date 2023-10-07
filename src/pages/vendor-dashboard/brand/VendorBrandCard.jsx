import React, { useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import Img_1 from '../../../assets/img/brand/1.jpg';
import { http } from '../../../components/action/axiosInstance';
import { reducer } from '../../../components/action/reducerAction';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function BrandCard({ data, delete_data_dandler, refetch }) {
	// get edit brand
	const { data: editData } = useQuery(['get_edit_brand_item', data], () => {
		return http.get(`/edit-brand/${data?.id}`);
	});
	const editableData = editData?.data?.category;
	const initialState = {};
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({
			type: 'API_DATA',
			payload: editableData,
		});
	}, [editableData]);

	// const brand_update = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const data_fetch = await http.post(
	// 			`/update-brand/${data?.id}`,
	// 			state,
	// 			multipartConfig
	// 		);

	// 		if (data_fetch.data.status === 200) {
	// 			refetch();
	// 		}
	// 	} catch (error) {}
	// };

	return (
		<div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
			<div className="card card-default">
				<div className="card-body text-center p-24px">
					<div className="image mb-3">
						<img
							src={
								data?.image
									? `${process.env.REACT_APP_IMG_URL}/${data?.image}`
									: Img_1
							}
							className="img-fluid rounded-circle"
							alt={data?.image}
						/>
					</div>

					<h5 className="card-title text-dark">{data?.name}</h5>
					<p className="item-count">
						2535<span> items</span>
					</p>
					<p className="item-count">
						status:<span> {data?.status}</span>
					</p>
					{/* <span className="brand-delete mdi mdi-delete-outline"></span> */}
					<span
						onClick={() => delete_data_dandler(data?.id)}
						className="brand-delete edit_icon_style"
					>
						<AiOutlineDelete />
					</span>
					<Link
						to={`/vendors-dashboard/edit/${data?.id}`}
						style={{ top: '30px' }}
						className="brand-delete edit_icon_style"
					>
						<FaRegEdit />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default BrandCard;
