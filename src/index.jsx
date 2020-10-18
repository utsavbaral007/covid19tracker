import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import DataProvider from './context/DataProvider'
import 'leaflet/dist/leaflet.css'

ReactDOM.render(
	<DataProvider>
		<App />
	</DataProvider>,
	document.getElementById('root')
)
