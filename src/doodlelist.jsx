import React from 'react'
import { DoodlePreview } from './doodlepreview'

const data = [
	{ id: 'asdf', date: 1462053600000, title: 'Volleyball' },
	{ id: 'jjjj', date: 1465053600000, title: 'Soccer' },
	{ id: 'hello', date: 1562053600000, title: 'Volleyball' }
]

export class DoodleList extends React.Component {
	render() {
		var previews = data.map(d => <DoodlePreview key={d.id} id={d.id} title={d.title} date={d.date} />)
		return <div>
			{previews}
		</div>
	}
}
