import React from 'react';
import u1 from '../../assets/img/user/u1.jpg';
function NewCustomersRow() {
	return (
		<tr>
			<td>
				<div className="media">
					<div className="media-image mr-3 rounded-circle">
						<a href="profile.html">
							<img
								className="profile-img rounded-circle w-45"
								src={u1}
								alt="customer images"
							/>
						</a>
					</div>
					<div className="media-body align-self-center">
						<a href="profile.html">
							<h6 className="mt-0 text-dark font-weight-medium">
								Selena Wagner
							</h6>
						</a>
						<small>@selena.oi</small>
					</div>
				</div>
			</td>
			<td>2 Orders</td>
			<td className="text-dark d-none d-md-block">$150</td>
		</tr>
	);
}

export default NewCustomersRow;
