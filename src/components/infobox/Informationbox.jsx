import React from 'react'
import './infobox.css'
import { Card, CardContent, Typography } from '@material-ui/core'

function Informationbox({ title, cases, total, active, isRed, ...props }) {
	return (
		<Card
			onClick={props.onClick}
			className={`info-box ${active && 'infobox-selected'}  ${
				isRed && 'infobox-red'
			}`}
		>
			<CardContent>
				<Typography className="infobox-title" color="textSecondary">
					{title}
				</Typography>
				<h2 className={`infobox-cases ${!isRed && 'infobox-cases-green'}`}>{cases}</h2>
				<Typography className="infobox-total" color="textSecondary">
					{total}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default Informationbox
