import React from 'react'
import moment from 'moment'
import styles from './index.scss'

class DoodleActionButton extends React.Component {
  render() {
    return <button
      type="submit"
      className={styles.button}
    >{this.props.text}</button>
  }
}

export class DoodlePreview extends React.Component {
	static propTypes = {
    id: React.PropTypes.string.isRequired,
    date: React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired
	}

	showPoll() {
		alert('show poll ' + this.props.id);
	}

	render() {
		return <div className={styles.event}>
      <span className={styles.eventDate}>
        {moment(this.props.date).calendar()}
      </span>
      <div style={{float: 'right'}}>
        <DoodleActionButton text="Join" />
      </div>
		</div>
	}
}
