import style from './Pricing.module.css';
import { FaCheck } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

function PricingCard({ data }) {
	return (
		<>
			{data?.subscription_amount !== '0' && (
				<div
					className={`${style.card} ${
						data.suggest === '1' && style.suggest
					} h-100`}
				>
					{data.suggest === '1' && (
						<span className={style.popular}>MOST POPULAR</span>
					)}
					{
						// data.suggest === "1" && (
						//   <img alt="shape" src={ActiveImg} className={style.qShape} />
						// )
						// <ActiveImg />
					}

					<div>
						{/* {data.pricing */}
						{/* .filter((x) => x.time === time)
            .map((e) => (
            ))} */}
						<div className={style.ppMonth}>
							<span className={style.pp}>${data.subscription_amount}</span>
							<span className={style.monthTxt}>
								/{data.subscription_package_type.replace(/_/, ' ')}
							</span>
						</div>
					</div>
					<h1 className={style.heading}>{data.card_heading}</h1>
					<div className={style.features}>
						<p
							className={style.features_head}
							style={{ color: data.suggest === '1' && '#fff' }}
						>
							Features Included :
						</p>
						{data?.card_facilities_title?.map((e, i) => (
							<div key={i} className={style.items}>
								{e.key === 'yes' ? (
									<FaCheck
										icon="fa-solid fa-check"
										className={`${style.features_ico} ${
											e.key === 'yes' && style.active
										}`}
									/>
								) : (
									// <ICON.checkBox
									//   className={`${style.features_ico} ${
									//     e.key === "yes" && style.active
									//   }`}
									// />
									<HiXMark
										className={`${style.features_ico} ${
											e.key === 'yes' && style.active
										}`}
									/>
								)}
								<span
									className={`${style.features_item}  ${
										e.key === 'yes' && style.active
									}`}
								>
									{e.value}
								</span>
							</div>
						))}
					</div>
					<Link
						className="mt-auto"
						to={`/vendor/renew/${data?.id}`}
						style={{ width: '100%' }}
					>
						<button className={`${style.buyNow}`}>Renew</button>
					</Link>
				</div>
			)}
		</>
	);
}

export default PricingCard;
