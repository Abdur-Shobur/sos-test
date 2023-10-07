import React from 'react';

function ContactInfo({ user }) {
	return (
		<div className="contact-info pt-4">
			<h5 className="text-dark">Contact Information</h5>
			<p className="text-dark font-weight-medium pt-24px mb-2">Email address</p>
			<p>{user?.email}</p>
			<p className="text-dark font-weight-medium pt-24px mb-2">Phone Number</p>
			<p>{user?.number || 'Not Set'}</p>
			<p className="text-dark font-weight-medium pt-24px mb-2">
				Phone Number 2
			</p>
			<p>{user?.number2 || 'Not Set'}</p>
		</div>
	);
}

export default ContactInfo;
