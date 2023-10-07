import React, { useReducer } from 'react';
import styles from './Modal.module.css';
import { RiCloseLine } from 'react-icons/ri';
import { initialState, reducer } from './action';
import { useEffect } from 'react';

import { updateHandler } from '../actions';

const Modal = ({ isOpen, setIsOpen, banks, refetch, setLoading }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		dispatch({
			type: 'API',
			payload: {
				value: banks[0].name,
			},
		});
	}, [banks]);

	const id = isOpen.id;

	return (
		<>
			<div
				className={styles.darkBG}
				onClick={() => setIsOpen({ open: false })}
			/>
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Dialog</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen({ open: false })}
					>
						<RiCloseLine style={{ marginBottom: '-3px' }} />
					</button>

					<form>
						<div className="mb-3">
							<label for="admin_bank_name" className="form-label">
								Select Bank
							</label>
							<select
								className="form-select form-control"
								aria-label="Default select example"
								name="admin_bank_name"
								id="admin_bank_name"
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: {
											name: e.target.name,
											value: e.target.value,
										},
									})
								}
							>
								{banks.map((e) => (
									<option key={e.id} value={e.name}>
										{e.name}
									</option>
								))}
							</select>
						</div>
						<div className="mb-3">
							<label for="admin_transition_id" className="form-label">
								Admin Transition ID
							</label>
							<input
								type="text"
								className="form-control"
								id="admin_transition_id"
								name="admin_transition_id"
								aria-describedby="emailHelp"
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: {
											name: e.target.name,
											value:
												e.target.value.trim() === ''
													? null
													: e.target.value.trim(),
										},
									})
								}
							/>
						</div>
						<div className="mb-3">
							<label for="admin_screenshot" className="form-label">
								Add Screenshot
							</label>
							<input
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: {
											name: e.target.name,
											value: e.target.files[0] ? e.target.files[0] : null,
										},
									})
								}
								className="form-control"
								type="file"
								id="admin_screenshot"
								name="admin_screenshot"
							/>
						</div>

						{/* <div className="mb-3">
							<label for="status" className="form-label">
								Status
							</label>
							<select
								className="form-select form-control"
								aria-label="Default select example"
								name="status"
								id="status"
								disabled
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: {
											name: e.target.name,
											value: e.target.value,
										},
									})
								}
							>
								<option value="success">Success</option>
							</select>
						</div> */}
						<div className=" form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="exampleCheck1"
								name="checked"
								onChange={(e) =>
									dispatch({
										type: 'INPUT',
										payload: {
											name: e.target.name,
											value: e.target.checked,
										},
									})
								}
							/>
							<label className="form-check-label" for="exampleCheck1">
								Confirm
							</label>
						</div>
					</form>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								disabled={!state.checked && state.admin_transition_id === null}
								className={
									state.checked && state.admin_transition_id !== null
										? 'primaryBtn'
										: 'btnSecondary'
								}
								onClick={() =>
									updateHandler(id, state, setLoading, setIsOpen, refetch)
								}
							>
								Success
							</button>
							<button
								className={styles.deleteBtn}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
