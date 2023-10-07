import { useParams } from 'react-router-dom';
import { AffiliateRequestProductView } from '../../../api/vendor/apiVendor';
import RequestView from './request-view/RequestView';

function AffiliateRequestView() {
	const { id } = useParams();

	const { isLoading, product, refetch } = AffiliateRequestProductView(id);
	return (
		<div className="content">
			<RequestView
				product={product?.product}
				isLoading={isLoading}
				mainProduct={product}
				refetch={refetch}
			/>
		</div>
	);
}

export default AffiliateRequestView;
