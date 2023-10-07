import React from 'react';
import ReviewTable from '../../../components/reviewTable/ReviewTable';

function Reviews() {
	return (
		<div className="ec-content-wrapper">
			<div className="content">
				<div className="breadcrumb-wrapper breadcrumb-wrapper-2 d-flex align-items-center justify-content-between">
					<h1>Review</h1>
					<p className="breadcrumbs">
						<span>
							<a href="index.html">Home</a>
						</span>
						<span>
							<i className="mdi mdi-chevron-right"></i>
						</span>
						Review
					</p>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card card-default">
							<div className="card-body">
								<div className="table-responsive">
									<ReviewTable />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Reviews;
