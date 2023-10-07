 // Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination, Virtual } from 'swiper';
import { DemoIcon } from '../table/TableComponents';
import { Link } from 'react-router-dom';

export default function VendorProductSlider({ product }) {
	return (
		<Swiper
			slidesPerView={4}
			spaceBetween={10}
			pagination={{
				clickable: true,
			}}
			breakpoints={{
				'@0.00': {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				'@0.75': {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				'@1.00': {
					slidesPerView: 3,
					spaceBetween: 45,
				},
				'@1.50': {
					slidesPerView: 4,
					spaceBetween: 50,
				},
			}}
			modules={[Pagination, Virtual]}
			className="mySwiper"
			virtual
		>
			{product?.map((slideContent, index) => (
				<SwiperSlide key={slideContent.id} virtualIndex={index}>
					<Link to={'/vendors-dashboard/product-list/' + slideContent?.id}>
						<div className="card card-default">
							<div className="card-body text-center p-24px">
								<div className="image mb-3">
									<img
										style={{
											width: '250px',
											height: '250px',
											objectFit: 'cover',
										}}
										src={
											slideContent?.image
												? process.env.REACT_APP_IMG_URL +
												  '/' +
												  slideContent?.image
												: DemoIcon
										}
										className="img-fluid rounded-circle"
										alt="Avatar Images"
									/>
								</div>

								<h5 className="card-title text-dark">{slideContent?.name}</h5>
								<p className="item-count">
									<span className="badge badge-dark">
										{slideContent?.product_qty} Qty
									</span>
								</p>
							</div>
						</div>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
