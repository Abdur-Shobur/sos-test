import React from 'react';
import { Link } from 'react-router-dom';

function AffiliateMenu({ data }) {
	return (
		<Link to={`/affiliates-dashboard/orders-history-view/${data?.id}`}>
			<span className={`mb-2 mr-2 badge badge-primary`}>preview</span>
		</Link>
	);
}

export default AffiliateMenu;
