import {
	http,
	multipartConfig,
} from '../../../../components/action/axiosInstance';
import {
	initialState,
	reducer,
} from '../../../../components/action/supportTicketReducer';
import Aos from 'aos';
import { useParams } from 'react-router-dom';
import tost from '../../../../components/action/tost';
import React, { useEffect, useState, useReducer } from 'react';
import { GetAdminReplyData } from '../../../../api/admin/apiAdmin';
import ComponentLoader from '../../../../components/loader/ComponentLoader';
import SupportHeading from '../../../../components/support-create/support-replay/SupportHeading';
import SupportDec from '../../../../components/support-create/support-replay/SupportDec';
import SupportMessageRow from '../../../../components/support-create/support-replay/SupportMessageRow';
import SupportImagePreview from '../../../../components/support-create/support-replay/SupportImagePreview';
import SupportMessageBox from '../../../../components/support-create/support-replay/SupportMessageBox';
import AdminSupportRatingShow from '../../../../components/support-create/support-replay/AdminSupportRatingShow';

const AdminSingleSupport = () => {
	const data = useParams();
	const [loading, setLoading] = useState(false);
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialState);
	const { adminReplyData, refetch, isLoading } = GetAdminReplyData(data?.id);

	// load  data support id
	useEffect(() => {
		dispatch({ type: 'API', payload: data?.id });
	}, [data.id]);

	const handleSubmitData = async (e) => {
		e.preventDefault();
		setLoading(true);
		delete state.url;

		try {
			const data = await http.post(
				`/admin/supportbox-replay`,
				state,
				multipartConfig
			);
			if (data?.data?.data !== 'success') {
				tost(data?.data?.errors.name[0]);
			} else if (data?.data?.data === 'success') {
				e.target.reset();
				refetch();
			}
		} catch (error) {
			setLoading(false);
		}
		dispatch({ type: 'CLEAR' });
		setLoading(false);
	};

	const handleChatOff = async () => {
		setLoadingBtn(true);
		try {
			const newData = await http.post(`/admin/close-support-box/${data?.id}`);

			if (newData?.data?.data !== 'success') {
				tost(newData?.data?.errors.name[0]);
			} else if (newData?.data?.data === 'success') {
				tost(newData?.data?.message);
			}
		} catch (error) {}
		setLoadingBtn(false);
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
							<SupportHeading
								data={adminReplyData}
								handleChatOff={handleChatOff}
								loadingBtn={loadingBtn}
								from="admin"
							/>

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
								<div class="card-body">
									<SupportDec data={adminReplyData} />
									{adminReplyData?.ticketreplay?.map((data) => (
										<div key={data.id}>
											{data?.user?.role_as !== '1' && (
												<SupportMessageRow data={data} position="left" />
											)}
											{data?.user?.role_as === '1' && (
												<SupportMessageRow data={data} position="right" />
											)}
										</div>
									))}

									{/* upload image   */}
									<SupportImagePreview dispatch={dispatch} state={state} />

									{adminReplyData?.is_close === '1' ? (
										<AdminSupportRatingShow data={adminReplyData} />
									) : (
										<SupportMessageBox
											state={state}
											loading={loading}
											dispatch={dispatch}
											handleSubmitData={handleSubmitData}
										/>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* <div className=" mb-4">
	<div class="d-flex flex-row justify-content-start">
		<img
			src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
			alt="avatar 1"
			style={{ width: '45px', height: '100%' }}
		/>
		<div
			class="p-3 ms-3"
			style={{
				borderRadius: '15px',
				backgroundColor: 'rgba(57, 192, 237, 0.2)',
			}}
		>
			<p class="small mb-0">{data?.description}</p>
			<p class="small mb-0 text-end">{time(data?.created_at).time}</p>
		</div>
	</div>

	{data?.file && (
		<div className="bg-image mb-2">
			<img
				onClick={() => photoView(data?.file.name.replace(/\//g, '/'))}
				src={IMG_PATH + '/' + data?.file.name}
				style={{
					borderRadius: '15px',
					maxWidth: '320px',
					width: '100%',
					height: '120px',
					objectFit: 'cover',
					cursor: 'pointer',
				}}
				alt="video"
			/>
		</div>
	)}
</div>; */}

			{/* <div className=" mb-4">
	<div className="d-flex flex-row justify-content-end">
		<div
			className="p-3 me-3 border"
			style={{
				borderRadius: '15px',
				backgroundColor: '#fbfbfb',
			}}
		>
			<p className="small mb-0">{data?.description}</p>
		</div>
		<img
			src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
			alt="avatar 1"
			style={{ width: '45px', height: '100%' }}
		/>
	</div>

	{data?.file && (
		<div className="bg-image d-flex justify-content-end mb-2">
			<img
				onClick={() => photoView(data?.file.name.replace(/\//g, '/'))}
				src={IMG_PATH + '/' + data?.file.name.replace(/\//g, '/')}
				style={{
					borderRadius: '15px',
					maxWidth: '320px',
					width: '100%',
					height: '120px',
					objectFit: 'cover',
					cursor: 'pointer',
				}}
				alt="video"
			/>
		</div>
	)}
	<p className="small mb-0 text-end me-6">{time(data?.created_at).time}</p>
</div>; */}
		</section>
	);
};

export default AdminSingleSupport;
