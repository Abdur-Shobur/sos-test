import React, { useState } from 'react';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
export default function ProductSpecification() {
	const [numFields, setNumFields] = useState(1); // initial number of fields
	const [specifications, setSpecifications] = useState({}); // state object for specification values
	const [data, setData] = useState({});
	function handleMoreFields() {
		setNumFields(numFields + 1);
	}

	function handleSpecificationChange(event) {
		const { name, value } = event.target;
		setSpecifications((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();
		const formattedSpecs = {};
		for (let i = 0; i < numFields; i++) {
			const name = specifications[`spectype-${i}`];
			const value = specifications[`value-${i}`];
			if (name && value) {
				formattedSpecs[name] = value;
			}
		}
		setData(formattedSpecs);
	}
	let fields = [];

	const deleteHandler = (i) => {
		fields = fields.filter((e) => e.key !== i.toString());
	};

	for (let i = 0; i < numFields; i++) {
		fields.push(
			<div className="d-flex" style={{ gap: '20px' }} key={i}>
				<input
					className="mb-1"
					placeholder="name"
					type="text"
					name={`spectype-${i}`}
					onChange={handleSpecificationChange}
				/>
				<input
					className="mb-1"
					placeholder="value"
					type="text"
					name={`value-${i}`}
					onChange={handleSpecificationChange}
				/>
				<button>
					<AiFillDelete onClick={() => deleteHandler(i)} />
				</button>
			</div>
		);
	}

	return (
		<div>
			<h2>Specification Form</h2>
			<form onClick={handleSubmit} className="">
				{fields}
				<button className="btn btn-primary" onClick={handleMoreFields}>
					<AiOutlinePlus />
				</button>
				<button className="btn btn-primary ml-2" type="submit">
					Save
				</button>
			</form>
			<p> {JSON.stringify(data)}</p>
		</div>
	);
}
