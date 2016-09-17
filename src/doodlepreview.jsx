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
      style={{float: 'right'}}
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

	constructor(props) {
		super(props)

		const req = {
			url: pollsUrl + this.props.id,
			method: 'GET',
			headers: { 'Accept': 'application/json' }
		}

		minixhr(req, response => {
			let doodle = JSON.parse(response)
			let joined = doodle.participants.reduce(function (previous, current) { return previous || (current.name === this.getName()) }, false)
			console.log(joined)
	    this.setState({
				joined: joined
			})
		})
	}

	showPoll() {
		alert('show poll ' + this.props.id);
	}

	join() {
		const entity = {
			"name": this.getName(),
			"preferences": [ 1 ]
		}

		const req = {
			url: pollsUrl + this.props.id + '/participants',
			method: 'POST',
			data: JSON.stringify(entity),
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
		}

		minixhr(req, response => {
			this.setState({
				joined: true
			})
		})
	}

  getName() {
    let name = localStorage.getItem('name')
    if(!name) {
      name = animalNames.rand()
      this.setName(name)
    }
    return name
  }

  setName(name) {
    localStorage.setItem('name', name)
  }

	render() {
		let btn = null
		if (!this.state || !this.state.joined) {
			btn = <DoodleActionButton text="Join" onJoin={this.join.bind(this)} />
		}

		return <div className={styles.event}>
      <a className={styles.eventDate} href={'https://www.doodle.com/poll/' + this.props.id} target="_blank">
        {moment(this.props.date).calendar()}
      </a>
      </span>
			{ btn }
		</div>
	}
}
