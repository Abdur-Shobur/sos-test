import { useState } from 'react';

const UseIMG = () => {
	const [file, setFile] = useState(null);
	const [img_url, setImgUrl] = useState(null);

	function handleChange(e) {
		setFile(e.target.files[0]);
		setImgUrl(URL.createObjectURL(e.target.files[0]));
	}
	return { file, img_url, handleChange };
};

export default UseIMG;
