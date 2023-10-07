import React from 'react';

function Pagination({ page, setPage, isLoading, getPaginationData }) {
	const paginationHandler = (e) => {
		if (e.url === null) return;

		// check label is number
		if (parseInt(e.label) && isNaN) setPage(e.label);

		// if label not a number
		// this label can be {Next &raquo} or  {&laquo; Previous} and url {null}
		if (
			(e.label === 'Next &raquo;' && e.url !== null) ||
			(e.label === '&laquo; Previous' && e.url !== null)
		) {
			return setPage(e.url.split('=')[1]);
		}
	};
	return (
		<>
			{!isLoading && (
				<div className="flex-j-between-i-center">
					<p>
						Showing {getPaginationData?.from} to {getPaginationData?.to} of{' '}
						{getPaginationData?.total} entries
					</p>
					<nav aria-label="Page navigation example">
						<ul className="pagination justify-content-end">
							{getPaginationData?.links?.map((e, i) => (
								<li
									key={i}
									className={`page-item ${e.active && 'active'} ${
										e.url === null ? 'disabled' : ''
									}`}
								>
									<button
										disabled={e.url === null ? 'disabled' : ''}
										onClick={() => paginationHandler(e)}
										className={`page-link `}
									>
										{e.label === '&laquo; Previous'
											? 'Previous'
											: e.label === 'Next &raquo;'
											? 'Next'
											: e.label}
									</button>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</>
	);
}

export default Pagination;
