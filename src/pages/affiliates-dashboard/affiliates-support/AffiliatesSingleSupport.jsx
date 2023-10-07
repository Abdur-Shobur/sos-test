import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EditLoader from '../../../components/loader/EditLoader';
import { useReducer } from 'react';
import Aos from 'aos';
import { GetSupportData } from '../../../api/admin/apiAdmin';
import {
	initialState,
	reducer,
} from '../../../components/action/supportTicketReducer';
import ComponentLoader from '../../../components/loader/ComponentLoader';
import SupportHeading from '../../../components/support-create/support-replay/SupportHeading';
import SupportDec from '../../../components/support-create/support-replay/SupportDec';
import SupportMessageRow from '../../../components/support-create/support-replay/SupportMessageRow';
import SupportImagePreview from '../../../components/support-create/support-replay/SupportImagePreview';
import SupportMessageBox from '../../../components/support-create/support-replay/SupportMessageBox';
import SupportRatting from '../../../components/support-create/support-replay/SupportRatting';
import {
	HandleSubmitData,
	HanldeSubmitRating,
} from '../../../components/support-create/support-replay/support-action';

// import "./VendorSingleSupport.module.css";

const AffiliatesSingleSupport = () => {
	// param id
	const data = useParams();

	// state
	const [loading, setLoading] = useState(false);
	const [userRating, setUserRating] = useState(0);

	// get api all data
	const { allSupportData, refetch, isLoading } = GetSupportData(data?.id);

	// reducer
	const [state, dispatch] = useReducer(reducer, initialState);

	// load  data support id
	useEffect(() => {
		dispatch({ type: 'API', payload: data?.id });
	}, [data.id]);

	// submit handler

	const handleSubmitData = async (e) => {
		e.preventDefault();
		HandleSubmitData(e, state, dispatch, refetch, setLoading);
	};

	const ratingChanged = async (newRating) => {
		setUserRating(newRating);
	};

	const hanldeSubmitRating = async (e) => {
		e.preventDefault();
		HanldeSubmitRating(e, data, refetch, setLoading, userRating);
	};

	// loading animation
	useEffect(() => {
		Aos.init({ delay: 300, offset: 50, duration: 300 });
	}, []);

	return (
		<section data-aos="fade">
			<div className="py-5">
				<div className="row d-flex justify-content-center">
					<div className="col-lg-10">
						<div className="card" id="chat1" style={{ borderRadius: '15px' }}>
							<SupportHeading />

							{isLoading ? (
								<>
									<ComponentLoader />
									<ComponentLoader />
									<ComponentLoader />
									<ComponentLoader />
									<ComponentLoader />
									<ComponentLoader />
									<ComponentLoader />
								</>
							) : (
								<div className="card-body">
									<SupportDec data={allSupportData} />
									{/* messages loop  */}
									{allSupportData?.ticketreplay?.map((data) => (
										<div>
											{data?.user?.role_as === '1' && (
												<SupportMessageRow data={data} position="left" />
											)}
											{data?.user?.role_as !== '1' && (
												<SupportMessageRow data={data} position="right" />
											)}
										</div>
									))}

									{/* upload image   */}
									<SupportImagePreview dispatch={dispatch} state={state} />

									{isLoading ? (
										<EditLoader />
									) : (
										<div>
											{allSupportData?.is_close === '0' ? (
												<SupportMessageBox
													state={state}
													loading={loading}
													dispatch={dispatch}
													handleSubmitData={handleSubmitData}
												/>
											) : (
												<SupportRatting
													data={allSupportData}
													hanldeSubmitRating={hanldeSubmitRating}
													loading={loading}
													ratingChanged={ratingChanged}
													userRating={userRating}
												/>
											)}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AffiliatesSingleSupport;
