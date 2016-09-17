import React from 'react'
import { DoodlePreview } from './doodlepreview'
import { DoodleForm } from './doodleform'
import client from './client'
import minixhr from 'minixhr'

const pollsurl = 'https://api.tamedia.cloud/doodle/v1/polls'

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
		const entity = {
			"options": [
				{ "start": date }
			],
			"type": "DATE",
			"title": title,
			"initiator": {
				"name": "Jim Knopf",
				"email": "h347031@mvrht.com"
			}
		}

		minixhr({ url: pollsurl, method: 'OPTIONS', headers: {'apikey': '6a0d6c3dbfbd443aa5fea58c4b612c5b' } }, () => {
			const req = {
				url: pollsurl,
				method: 'POST',
				data: JSON.stringify(entity),
				headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'apikey': '6a0d6c3dbfbd443aa5fea58c4b612c5b' }
			}

			minixhr(req, response => {
				console.log(response)
				doodles.push({ id: response.id, title: response.title, date: response.options[0].start })
				this.setState({
					doodles: doodles
				})
			})

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
