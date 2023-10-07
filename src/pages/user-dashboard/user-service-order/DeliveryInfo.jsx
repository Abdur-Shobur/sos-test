import React from 'react';
import style from './SingleOrder.style.module.css';
import { time } from '../../../components/action/actions';
import { http } from '../../../components/action/axiosInstance';
import tost from '../../../components/action/tost';
import { downloadImage } from '../../../components/action/actions';
import { FiDownload } from 'react-icons/fi';

const DeliveryInfo = ({ orderSingleData, refetch }) => {
	const handleRevision = async (e) => {
		const data = await http.post('/service/order/status', e);
		if (data?.data?.data === 'success') {
			tost(data?.data?.message);
			refetch();
		} else if (data?.data?.message === 'Validation errors') {
			tost(data?.data?.data?.order_delivery_id[0]);
		}
	};
	return (
		<div className={style.packageInfo}>
			<h3 className={style.heading}>Delivery Info</h3>
			{orderSingleData?.orderdelivery?.map((e, i) => (
				<div key={i} className={style.delivaryDetails}>
					<h2 className={style.deliveryHeader}>Delivery {i + 1}:</h2>
					<div className={style.gridOption}>
						<div className={style.infomation}>
							<h1 className={style.tilte}>Date:</h1>
							<p className={style.info}>{time(e?.created_at).date}</p>
						</div>
						<div className={style.infomation}>
							<h1 className={style.tilte} id={style.textRight}>
								Time:
							</h1>
							<p className={style.info}>
								<p className={style.info}>{time(e?.created_at).time}</p>
							</p>
						</div>
					</div>
					<div className={style.infomation} id={style.flexInfo}>
						<div>
							<h1 className={style.tilte}>Document</h1>
							<div className={style.deliveryAll}>
								{e?.deliveryfiles?.map((file, i) => (
									<div className={style.deliveryImg}>
										<img
											key={i}
											style={{
												height: '100%',
												width: '100%',
												borderRadius: '10px',
											}}
											src={`${process.env.REACT_APP_IMG_URL}/${file?.files}`}
											alt="Delivery Images"
										/>
										<FiDownload
											onClick={() => downloadImage(file?.files)}
											className={style.downloadIcon}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className={style.infomation}>
						<h1 className={style.tilte}>Description</h1>
						<p className={style.info}>{e?.description}</p>
					</div>
				</div>
			))}
			{orderSingleData?.status === 'delivered' && (
				<div
					style={{
						display: 'flex',
						gap: '5px',
						justifyContent: 'end',
						marginTop: '15px',
					}}
				>
					<button
						onClick={() =>
							handleRevision({
								service_order_id: orderSingleData?.id,
								order_delivery_id:
									orderSingleData?.orderdelivery?.[
										orderSingleData?.orderdelivery?.length - 1
									]?.id,
								status: 'revision',
							})
						}
						className="btn btn-info"
					>
						Revision
					</button>
					<button
						onClick={() =>
							handleRevision({
								service_order_id: orderSingleData?.id,
								order_delivery_id:
									orderSingleData?.orderdelivery?.[
										orderSingleData?.orderdelivery?.length - 1
									]?.id,
								status: 'success',
							})
						}
						className="btn btn-success"
					>
						Success
					</button>
				</div>
			)}
		</div>
	);
};

export default DeliveryInfo;
