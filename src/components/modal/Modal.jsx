import React from 'react';
import styles from './Modal.module.css';
import { RiCloseLine } from 'react-icons/ri';

const Modal = ({ setIsOpen }) => {
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Update Payments</h5>
					</div>
					<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
						<RiCloseLine style={{ marginBottom: '-3px' }} />
					</button>
					<div className={styles.modalContent}>
						Are you sure you want to delete the item?
					</div>

					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.deleteBtn}
								onClick={() => setIsOpen(false)}
							>
								Delete
							</button>
							<button
								className={styles.cancelBtn}
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

// use there
// import React, { useState } from "react";
// import styles from "./App.module.css";

// import Modal from "./components/Modal";

// const App = () => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	return (
// 		<main>
// 			<button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
// 				Open Modal
// 			</button>
// 			{isOpen && <Modal setIsOpen={setIsOpen} />}
// 		</main>
// 	);
// };

// export default App;
