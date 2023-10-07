import { useState } from 'react';
import { CountrySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

function CountryCitySelect({ error }) {
	const [countryid, setCountryid] = useState(0);
	const [stateid, setstateid] = useState(0);
	return (
		<>
			<div className="col-lg-6 county-select-custom-design">
				<div className="form-group mb-4 position-relative">
					<span className="position-absolute mt-3 error">{error?.country}</span>

					<h6>Country</h6>
					<CountrySelect
						onChange={(e) => {
							setCountryid(e.id);
						}}
						placeHolder="Select Country"
						showFlag={false}
					/>
				</div>
			</div>
			<div className="col-lg-6 county-select-custom-design">
				<div className="form-group mb-4 position-relative">
					<span className="position-absolute mt-3 error">{error?.country}</span>

					<h6>City</h6>
					<StateSelect
						countryid={countryid}
						onChange={(e) => {
							setstateid(e.id);
						}}
						placeHolder="Select State"
					/>
				</div>
			</div>
		</>
	);
}

export default CountryCitySelect;
