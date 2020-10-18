import React, { useContext } from 'react'
import './map.css'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import { CountryData } from '../../context/DataProvider'
import { showDataOnMap } from '../sort'

function Map(props) {
	const { mapCenter, mapZoom, countries } = useContext(CountryData)
	return (
		<div className="map">
			<LeafletMap center={mapCenter} zoom={mapZoom}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href = "http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				{showDataOnMap(countries, props.casesType)}
			</LeafletMap>
		</div>
	)
}

export default Map
