import React, { useState, useEffect } from 'react'
import './graph.css'
import { Line } from 'react-chartjs-2'
import Axios from 'axios'
import numeral from 'numeral'

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format('+0,0')
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: 'time',
				time: {
					parser: 'MM/DD/YY',
					tooltipFormat: 'll',
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format('0a')
					},
				},
			},
		],
	},
}

const buildChartData = (data, casesType = 'cases') => {
	const chartData = []
	let lastDataPoint
	for (let date in data.cases) {
		if (lastDataPoint) {
			const newDataPoint = {
				x: date,
				y: data[casesType][date] - lastDataPoint,
			}
			chartData.push(newDataPoint)
		}
		lastDataPoint = data[casesType][date]
	}
	return chartData
}

function GraphStats({ casesType = 'cases' }) {
	const [graphInfo, setGraphInfo] = useState({})

	useEffect(() => {
		const getGraphInfo = async () => {
			try {
				const response = await Axios.get(
					`https://disease.sh/v3/covid-19/historical/all?lastdays=120`
				)
				let charData = buildChartData(response.data, casesType)
				setGraphInfo(charData)
			} catch (err) {
				console.log(err)
			}
		}
		getGraphInfo()
	}, [casesType])

	return (
		<div className="graph">
			{graphInfo?.length > 0 && (
				<Line
					options={options}
					data={{
						datasets: [
							{
								backgroundColor: 'rgba(204, 16, 52, 0.4)',
								borderColor: '#CC1034',
								data: graphInfo,
							},
						],
					}}
				/>
			)}
		</div>
	)
}

export default GraphStats
