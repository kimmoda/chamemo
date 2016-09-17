import React from 'react'
import moment from 'moment'
import styles from './index.scss'
import animalNames from 'node-animal'
import minixhr from 'minixhr'

class DoodleActionButton extends React.Component {
	static propTypes = {
		onJoin: React.PropTypes.func.isRequired
	}

  render() {
    return <button
      type="button"
			onClick={this.props.onJoin}
      className={styles.button}
    >{this.props.text}</button>
  }
}

const pollsUrl = 'http://localhost:3000/polls/';

export class DoodlePreview extends React.Component {
	static propTypes = {
    id: React.PropTypes.string.isRequired,
    date: React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired
	}

	showPoll() {
		alert('show poll ' + this.props.id);
	}

	join() {
    let name = localStorage.getItem('name')
    if(!name) {
      name = animalNames.rand()
      this.setName(name)
    }

		const entity = {
			"name": name,
			"preferences": [ 1 ]
		}

		const req = {
			url: pollsUrl + this.props.id + '/participants',
			method: 'POST',
			data: JSON.stringify(entity),
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		}

		minixhr(req, response => {
			var json = JSON.parse(response);
			alert('joined!');
		})

	}

	render() {
		return <div className={styles.event}>
      <a className={styles.eventDate} href={'https://www.doodle.com/poll/' + this.props.id} target="_blank">
        {moment(this.props.date).calendar()}
      </a>
      <div style={{float: 'right'}}>
        <DoodleActionButton text="Join" onJoin={this.join.bind(this)} />
      </div>
		</div>
	}
}
