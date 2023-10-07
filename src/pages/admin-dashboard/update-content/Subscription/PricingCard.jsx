import style from './Pricing.module.css';
import { FaCheck } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import ActiveImg from '../../../../assets/img/card-active-bg-shape.svg';
import { Link } from 'react-router-dom';

function PricingCard({ data, subscriptionLoading }) {
	return (
		<div
			className={`${style.card} ${data.suggest === '1' && style.suggest} h-100`}
		>
			{data.suggest === '1' && (
				<span className={style.popular}>MOST POPULAR</span>
			)}
			{
				data.suggest === '1' && (
					<img alt="shape" src={ActiveImg} className={style.qShape} />
				)
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
					You Will Get:
				</p>
				{data.affiliate_request && (
					<p className={`${style.features_item}  ${style.active}`}>
						Affiliate Request: {data.affiliate_request}
					</p>
				)}
				{data.product_qty && (
					<p className={`${style.features_item}  ${style.active}`}>
						Product Quantity: {data.product_qty}
					</p>
				)}
				{data.service_qty && (
					<p className={`${style.features_item}  ${style.active}`}>
						Service Quantity: {data.service_qty}
					</p>
				)}
				{data.product_request && (
					<p className={`${style.features_item}  ${style.active}`}>
						Product Request: {data.product_request}
					</p>
				)}
				{data.product_approve && (
					<p className={`${style.features_item}  ${style.active}`}>
						Product Approve: {data.product_approve}
					</p>
				)}
				{data.service_create && (
					<p className={`${style.features_item}  ${style.active}`}>
						Service Create: {data.service_create}
					</p>
				)}
				<Link
					className="mt-auto"
					to={`/admin/subscription/${data?.id}-facility`}
					style={{ width: '100%' }}
				>
					<span className={`${style.buyNow}`}>Edit Facility</span>
				</Link>
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
				to={`/admin/subscription/${data?.id}`}
				style={{ width: '100%' }}
			>
				<button className={`${style.buyNow}`}>Edit</button>
			</Link>
		</div>
	);
}

export default PricingCard;
