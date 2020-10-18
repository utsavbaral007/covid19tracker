import React, { createContext, useState, useEffect } from 'react'
import Axios from 'axios'
import { sortData } from '../components/sort'

export const CountryData = createContext()

function DataProvider(props) {
	const [countries, setCountries] = useState([])
	const [countryStats, setCountryStats] = useState({})
	const [tableData, setTableData] = useState([])
	const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
	const [mapZoom, setMapZoom] = useState(2)

	useEffect(() => {
		const getCountries = async () => {
			try {
				const response = await Axios.get(
					'https://disease.sh/v3/covid-19/countries'
				)
				if (response.data) {
					const sortedData = sortData(response.data)
					setTableData(sortedData)
					setCountries(response.data)
				}
			} catch (err) {
				console.log(err)
			}
		}
		getCountries()
	}, [])

	useEffect(() => {
		const loadWorldWide = async () => {
			try {
				const response = await Axios.get('https://disease.sh/v3/covid-19/all')
				setCountryStats(response.data)
			} catch (err) {
				console.log(err)
			}
		}
		loadWorldWide()
	}, [])

	const getCountryCode = async (code) => {
		const url =
			code === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${code}`
		try {
			const response = await Axios.get(url)
			setCountryStats(response.data)
			code === 'worldwide'
				? setMapCenter([34.80746, -40.4796])
				: setMapCenter([
						response.data.countryInfo.lat,
						response.data.countryInfo.long,
				  ])

			setMapZoom(4)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<CountryData.Provider
			value={{
				countries,
				setCountries,
				getCountryCode,
				countryStats,
				tableData,
				mapCenter,
				mapZoom,
			}}
		>
			{props.children}
		</CountryData.Provider>
	)
}

export default DataProvider
