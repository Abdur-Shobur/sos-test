import React from 'react';
import { ClipLoader } from 'react-spinners';

function SupportMessageBox({ handleSubmitData, state, dispatch, loading }) {
	return (
		<div style={{ position: 'relative' }} className="form-outline">
			<form onSubmit={handleSubmitData}>
				<input
					style={{
						padding: '10px 80px 10px 70px',
						height: '85px ',
						width: '100%',
						borderRadius: '15px',
						border: '1px solid #eeeeee',
						color: '#777',
					}}
					type="text"
					name={'description'}
					require={true}
					onChange={(e) =>
						dispatch({
							type: 'INPUT',
							payload: {
								name: e.target.name,
								value: e.target.value,
							},
						})
					}
					placeholder={'Your Message'}
				/>
				<div
					style={{
						position: 'absolute',
						top: '13%',
						left: '1%',
					}}
				>
					<img
						src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
						alt="avatar 1"
						style={{ width: '45px', height: '100%' }}
					/>
				</div>
				<div
					style={{
						position: 'absolute',
						top: '20%',
						right: '1.5%',
						display: 'flex',
						alignItems: 'center',
						gap: '5px',
					}}
				>
					<input
						type="file"
						name="file"
						accept="image/*"
						id="attachImg"
						// ref={fileInputRef}
						onChange={(e) => {
							dispatch({
								type: 'FILE',
								payload: e.target.files[0],
							});
							e.target.value = null;
						}}
						className="d-none"
					/>
					<label htmlFor="attachImg">
						<svg
							style={{ cursor: 'pointer' }}
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 300 256"
						>
							<path
								fill="currentColor"
								d="M136.37 187.53a12 12 0 0 1 0 17l-5.94 5.94a60 60 0 0 1-84.88-84.88l24.12-24.11A60 60 0 0 1 152 99a12 12 0 1 1-16 18a36 36 0 0 0-49.37 1.47l-24.1 24.08a36 36 0 0 0 50.92 50.92l5.94-5.94a12 12 0 0 1 16.98 0Zm74.08-142a60.09 60.09 0 0 0-84.88 0l-5.94 5.94a12 12 0 0 0 17 17l5.94-5.94a36 36 0 0 1 50.92 50.92l-24.11 24.12A36 36 0 0 1 120 139a12 12 0 1 0-16 18a60 60 0 0 0 82.3-2.43l24.12-24.11a60.09 60.09 0 0 0 .03-84.91Z"
							/>
						</svg>
					</label>
					<input
						type="submit"
						value="Submit"
						id="submit-button"
						className="d-none"
						disabled={
							loading || state.description === '' || state.description === null
						}
					/>

					{loading ? (
						<ClipLoader color="#36d7b7" size={20} />
					) : (
						<label htmlFor="submit-button">
							<svg
								style={{
									cursor: state.description ? 'pointer' : 'not-allowed',
								}}
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M22 12L3 20l3.563-8L3 4l19 8ZM6.5 12H22"
								/>
							</svg>
						</label>
					)}
				</div>
			</form>
		</div>
	);
}

export default SupportMessageBox;
