import { useState } from 'react';

function CopyClipboardHandler() {
	const [copied, setCopied] = useState(false);
	const [copy_data, set_copy_data] = useState('');

	const click_button_handler = (e) => {
		set_copy_data(e);
		navigator.clipboard.writeText(e);
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return { copy_data, set_copy_data, copied, click_button_handler };
}

export default CopyClipboardHandler;
