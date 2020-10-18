import React, { useContext, useState } from 'react'
import Header from './components/header/Header'
import Informationbox from './components/infobox/Informationbox'
import Map from './components/map/Map'
import { Card, CardContent } from '@material-ui/core'
import { CountryData } from './context/DataProvider'
import Table from './components/table/Table'
import GraphStats from './components/graphstats/GraphStats'
import { prettyPrintStat } from './components/sort'

function App() {
	const { countryStats, tableData } = useContext(CountryData)
	const [casesType, setCasesType] = useState('cases')

	return (
		<div className="app">
			<div className="app-left">
				<Header />

				<div className="information">
					<Informationbox
						isRed={true}
						active={casesType === 'cases'}
						onClick={(e) => setCasesType('cases')}
						title="Covid-19 Cases"
						cases={prettyPrintStat(countryStats.todayCases)}
						total={prettyPrintStat(countryStats.cases)}
					/>
					<Informationbox
						active={casesType === 'recovered'}
						onClick={(e) => setCasesType('recovered')}
						title="Recovered"
						cases={prettyPrintStat(countryStats.todayRecovered)}
						total={prettyPrintStat(countryStats.recovered)}
					/>
					<Informationbox
						isRed={true}
						active={casesType === 'deaths'}
						onClick={(e) => setCasesType('deaths')}
						title="Deaths"
						cases={prettyPrintStat(countryStats.todayDeaths)}
						total={prettyPrintStat(countryStats.deaths)}
					/>
				</div>

				<Map casesType={casesType} />
			</div>
			<Card className="app-right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table data={tableData} />
					<h3>Worldwide new {casesType}</h3>
				</CardContent>
				<GraphStats casesType={casesType} />
			</Card>
		</div>
	)
}

export default App
