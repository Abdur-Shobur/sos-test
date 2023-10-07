import { useState } from 'react';
import style from './Subscripton.module.css';
import Radio from './Radio';
import PricingCard from './PricingCard';
import EditLoader from '../../../../components/loader/EditLoader';
function SubscriptionOption({ subscriptions, subscriptionLoading }) {
	const [toggle, setToggle] = useState('vendor');
	const [time, setTime] = useState('monthly');

	return (
		<section className={style.pricingMain}>
			<div className="layout">
				<div className={style.wrap}>
					<div className={style.topOfHead}>
						<button
							onClick={() => setToggle('vendor')}
							className={`${style.btnTop} ${
								toggle === 'vendor' && style.active
							}`}
						>
							Vendor
						</button>
						<button
							onClick={() => setToggle('affiliate')}
							className={`${style.btnTop} ${
								toggle === 'affiliate' && style.active
							}`}
						>
							Affiliate
						</button>
					</div>

					<div className={style.DateSelectBox}>
						<div className={style.date}>
							<Radio time={time} setTime={setTime} txt={'monthly'} />
							<Radio time={time} setTime={setTime} txt={'half_yearly'} />
							<Radio time={time} setTime={setTime} txt={'yearly'} />
						</div>
					</div>
					{subscriptionLoading ? (
						<EditLoader />
					) : (
						<div className={style.ppCards}>
							{subscriptions
								?.filter((e) => e.subscription_user_type === toggle)
								?.filter((e) => e.subscription_package_type === time)
								?.map((item) => (
									<PricingCard key={item.id} data={item} time={time} />
								))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default SubscriptionOption;
