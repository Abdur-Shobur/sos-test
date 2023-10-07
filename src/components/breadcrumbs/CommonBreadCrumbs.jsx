import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../formComponent/Search';

function CommonBreadCrumbs({
	searchHandler,
	heading,
	link = { path: '', name: '' },
	home = '/',
	from,
	product,
}) {
	return (
		<div className="breadcrumb-wrapper breadcrumb-contacts">
			<div>
				<h1>{heading}</h1>
				<p className="breadcrumbs">
					<span>
						<Link to={home}>Home</Link>
					</span>
					<span>
						<i className="mdi mdi-chevron-right"></i>
					</span>
					{heading}
				</p>
			</div>
			{searchHandler && (
				<div className="d-flex" style={{ gap: '5px' }}>
					<Search searchHandler={searchHandler} />
				</div>
			)}

			{link.name && (
				<div className="d-flex" style={{ gap: '10px' }}>
					{from === 'admin' && (
						<div className="form-floating">
							<select
								// onChange={(e) =>
								// 	active_status_handler(product?.id, e.target.value)
								// }
								className="form-select"
								id="floatingSelect"
								aria-label="Floating label select example"
							>
								<option
									selected={product?.status === 'pending'}
									value="pending"
								>
									Pending
								</option>
								<option selected={product?.status === 'active'} value="active">
									Active
								</option>
								<option
									selected={product?.status === 'rejected'}
									value="rejected"
								>
									Rejected
								</option>
								<option selected={product?.status === 'hold'} value="hold">
									Hold
								</option>
								<option selected={product?.status === 'delete'} value="delete">
									Delete
								</option>
							</select>
							<label for="floatingSelect">Status</label>
						</div>
					)}
					<Link to={link.path} className="btn btn-primary">
						{link.name}
					</Link>
				</div>
			)}
		</div>
	);
}

export default CommonBreadCrumbs;
