import Img_1 from '../../../assets/img/brand/1.jpg';

import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function BrandCard({ data, delete_data_dandler }) {
	return (
		<div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
			<div className="card card-default">
				<div className="card-body text-center p-24px">
					<div className="image mb-3">
						<img
							style={{ height: '100px', objectFit: 'contain' }}
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
						<span
							className={`mb-2 mr-2 badge ${
								(data?.status === 'pending' && 'badge-warning') ||
								(data?.status === 'active' && 'badge-success')
							}`}
						>
							{data?.status}
						</span>
					</p>
					{/* <span className="brand-delete mdi mdi-delete-outline"></span> */}
					<span
						onClick={() => delete_data_dandler(data?.id)}
						className="brand-delete edit_icon_style"
					>
						<AiOutlineDelete />
					</span>
					<Link
						to={`/admin/brand-list/edit/${data?.id}`}
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
