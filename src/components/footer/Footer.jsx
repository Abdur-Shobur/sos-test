/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Footer() {
	return (
		<>
			<footer className="footer mt-auto">
				<div className="copyright bg-white">
					<p>
						Copyright &copy; <span id="ec-year"></span>
						<a
							className="text-primary"
							rel="noreferrer"
							href="#"
							target="_blank"
						>
							SOS Admin Dashboard
						</a>
						. All Rights Reserved.
					</p>
				</div>
			</footer>
		</>
	);
}

export default Footer;
