import React, { useState, useContext } from 'react'
import './header.css'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import { CountryData } from '../../context/DataProvider'

function Header() {
	const { countries, getCountryCode } = useContext(CountryData)

	const [selectedCountry, setSelectedCountry] = useState('worldwide')

	const countryChange = (e) => {
		const countryCode = e.target.value
		setSelectedCountry(countryCode)
		getCountryCode(countryCode)
	}

	return (
		<div className="app-header">
			<h1>COVID-19 Tracker</h1>
			<FormControl className="app-dropdown">
				<Select
					variant="outlined"
					value={selectedCountry}
					onChange={countryChange}
				>
					<MenuItem value="worldwide">Worldwide</MenuItem>
					{countries &&
						countries.map((country) => (
							<MenuItem value={country.countryInfo.iso2} key={country.country}>
								{country.country}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</div>
	)
}

export default Header
