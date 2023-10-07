import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Navigation, Thumbs, Virtual } from 'swiper';

const im = [
	'https://swiperjs.com/demos/images/nature-1.jpg',
	'https://swiperjs.com/demos/images/nature-2.jpg',
	'https://swiperjs.com/demos/images/nature-3.jpg',
	'https://swiperjs.com/demos/images/nature-4.jpg',
	'https://swiperjs.com/demos/images/nature-5.jpg',
	'https://swiperjs.com/demos/images/nature-6.jpg',
	'https://swiperjs.com/demos/images/nature-7.jpg',
	'https://swiperjs.com/demos/images/nature-8.jpg',
	'https://swiperjs.com/demos/images/nature-10.jpg',
];
export default function Slider({ product_image = [], image }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const allImage = [
		{
			id: product_image
				? product_image[product_image?.length - 1]?.id + 1 || 1
				: 0,
			image,
		},
		...product_image,
	];

	return (
		<>
			<div className="col-xl-4 col-lg-6">
				<div className="row">
					<Swiper
						loop={true}
						spaceBetween={10}
						navigation={true}
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
						}}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper2"
					>
						{allImage?.map((slideContent, index) => (
							<SwiperSlide key={slideContent.id} virtualIndex={index}>
								<img
									style={{
										borderRadius: '10px',
										background: '#c7c7c7',
										height: '100%',
										maxHeight: '400px',
										objectFit: 'contain',
									}}
									className="img-responsive w-100"
									src={` ${process.env.REACT_APP_IMG_URL}/${slideContent.image}`}
									alt=""
								/>
							</SwiperSlide>
						))}
					</Swiper>

					<Swiper
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={4}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs, Virtual]}
						className="mySwiper"
						virtual
					>
						{allImage?.map((slideContent, index) => (
							<SwiperSlide
								className="mt-3"
								key={slideContent.id}
								virtualIndex={index}
							>
								<img
									style={{
										width: '64px',
										height: '64px',
										borderRadius: '5px',
										background: '#c7c7c7',
										objectFit: 'cover',
									}}
									className="img-responsive w-100"
									src={` ${process.env.REACT_APP_IMG_URL}/${slideContent.image}`}
									alt=""
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</>
	);
}
