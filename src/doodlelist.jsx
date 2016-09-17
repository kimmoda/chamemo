import React from 'react'
import { DoodlePreview } from './doodlepreview'
import { DoodleForm } from './doodleform'
import minixhr from 'minixhr'
import animalNames from 'node-animal'
import ReactFireMixin from 'reactfire'
import firebase from 'firebase'
import reactMixin from 'react-mixin'
import styles from './index.scss'

const pollsurl = 'http://localhost:3000/polls'

export class DoodleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { doodles: [] }
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

  getName() {
    let name = localStorage.getItem('name')
    if(!name) {
      name = animalNames.rand()
      this.setName(name)
    }
    return name
  }

	onNewDoodle(date) {
		const doodles = this.state.doodles
		const entity = {
			"options": [
				{ "start": date }
			],
			"type": "DATE",
			"title": (this.props.sport) ? this.props.sport : 'invitation',
			"initiator": {
				"name": this.getName(),
				"email": "h347031@mvrht.com"
			}
		}

		const req = {
			url: pollsurl,
			method: 'POST',
			data: JSON.stringify(entity),
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		}

		minixhr(req, response => {
			var json = JSON.parse(response);
    	this.firebaseRefs['doodles'].push({ id: json.id, title: json.title, date: json.options[0].start })
		})
	}

	render() {
		var previews = this.state.doodles.map(d => <DoodlePreview key={d.id} id={d.id} title={d.title} date={d.date} />)
		return <div>
      <h2 className={styles.title}>Get together</h2>
			{previews}
			<DoodleForm onNewDoodle={ this.onNewDoodle.bind(this) } />
		</div>
	}
}

reactMixin(DoodleList.prototype, ReactFireMixin)
