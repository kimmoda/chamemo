import React from 'react'
import minixhr from 'minixhr'

const pollsurl = 'https://localhost:3000/polls/'

export class DoodleDetail extends React.Component {

	static propTypes = {
		id: React.PropTypes.string.isRequired
	}

  constructor(props) {
    super(props)

		const req = {
			url: pollsurl + this.props.id,
			method: 'GET',
			headers: {'Accept': 'application/json', 'apikey': '6a0d6c3dbfbd443aa5fea58c4b612c5b' }
		}

		minixhr(req, response => {
	    this.state = {
				doodle: response
			}
		})
	}

	render() {
		return <div>
			<h2>{this.state.doodle.options[0].start} - {this.state.doodle.title}</h2>
			<div>
				{ this.state.doodle.participants.map(p => <h4>{p.firstName} {p.lastName} {p.preferences[0]}</h4> ) }
			</div>
		</div>
	}
}
