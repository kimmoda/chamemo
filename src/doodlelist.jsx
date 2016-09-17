import React from 'react'
import { DoodlePreview } from './doodlepreview'
import { DoodleForm } from './doodleform'

export class DoodleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			doodles: [
					{ id: 'asdf', date: 1462053600000, title: 'Volleyball' },
					{ id: 'jjjj', date: 1465053600000, title: 'Soccer' },
					{ id: 'hello', date: 1562053600000, title: 'Volleyball' }
				]
		}
	}

	onNewDoodle(title, date) {
		const doodles = this.state.doodles
		doodles.push({id: (Math.random() * 16).toString(16), title: title, date: date})
		this.setState({
			doodles: doodles
		})
	}

	render() {
		var previews = this.state.doodles.map(d => <DoodlePreview key={d.id} id={d.id} title={d.title} date={d.date} />)
		return <div>
			{previews}
			<DoodleForm onNewDoodle={ this.onNewDoodle.bind(this) } />
		</div>
	}
}
