import React from 'react'
import { DoodlePreview } from './doodlepreview'
import { DoodleForm } from './doodleform'
import minixhr from 'minixhr'
import ReactFireMixin from 'reactfire'
import firebase from 'firebase'
import reactMixin from 'react-mixin'

const pollsurl = 'http://localhost:3000/polls'

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

  componentWillReceiveProps(nextProps) {
    this.unbind('doodles');
    this.bindOsmid(nextProps.osmid);
  }

  bindOsmid(osmid) {
    this.bindAsArray(firebase.database().ref('doodleList').child(osmid), 'doodles');
  }

  componentWillMount() {
    this.bindOsmid(this.props.osmid);
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

		const req = {
			url: pollsurl,
			method: 'POST',
			data: JSON.stringify(entity),
			headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'apikey': '6a0d6c3dbfbd443aa5fea58c4b612c5b' }
		}

		minixhr(req, response => {
			var json = JSON.parse(response);
			doodles.push({ id: json.id, title: json.title, date: json.options[0].start })
    	this.firebaseRefs['doodles'].push({id: json.id});
			this.setState({
				doodles: doodles
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

reactMixin(DoodleList.prototype, ReactFireMixin)
