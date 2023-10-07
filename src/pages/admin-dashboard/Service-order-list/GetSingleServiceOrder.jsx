import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CommonBreadCrumbs from '../../../components/breadcrumbs/CommonBreadCrumbs';
import { useParams } from 'react-router-dom';
import EditLoader from '../../../components/loader/EditLoader';
import style from './SingleOrder.style.module.css';
import { GetAdminSinlgeService } from '../../../api/admin/apiAdmin';
import Aos from 'aos';
import PackageInfo from './PackageInfo';
import ServiceInfo from './ServiceInfo';

const GetSingleServiceOrder = () => {
	const id = useParams().id;
	const { orderSingleData, isLoading } = GetAdminSinlgeService(id);

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<div>
			<Helmet>
				<title>Service Order-SOS</title>
			</Helmet>
			<div className="content">
				<CommonBreadCrumbs
					heading="Order Details"
					link={{ name: 'All Order', path: '/admin/service-order' }}
				/>
				{isLoading ? (
					<EditLoader />
				) : (
					<div
						data-aos="fade"
						style={{ maxWidth: '1200px', margin: '20px auto' }}
						className="ec-cat-form shadow p-lg-4 p-0"
					>
						<div className="modal-header px-4">
							<h5
								style={{ fontSize: '24px', fontWeight: 'bold' }}
								className="modal-title"
								id="exampleModalCenterTitle"
							>
								My Order Detailis
							</h5>
						</div>
						<div className="modal-body px-lg-4 px-3">
							<div className="row mb-2">
								<ServiceInfo orderSingleData={orderSingleData} />
								<PackageInfo orderSingleData={orderSingleData} />
								<div className={style.packageInfo}>
									<h3 className={style.heading}>User Info</h3>
									<div className={style.gridOption}>
										<div className={style.infomation}>
											<h1 className={style.tilte}>Name:</h1>
											<p className={style.info}>
												{orderSingleData?.customerdetails?.name}
											</p>
										</div>
										<div className={style.infomation}>
											<h1 className={style.tilte} id={style.textRight}>
												Email:
											</h1>
											<p className={style.info}>
												{orderSingleData?.customerdetails?.email}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GetSingleServiceOrder;
