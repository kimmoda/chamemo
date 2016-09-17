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
      <h3 style={{
        paddingLeft: 8,
        display: 'inline-block',
        fontSize: 16,
        fontWeight: 400,
        color: '#888',
        width: 137,
        margin: 0,
      }}>{this.props.title}</h3>
      <span style={{
        margin: 0,
        paddingLeft: 8,
        paddingRight: 8,
        width: 116,
        color: 'rgb(148, 194, 237)',
      }}>
        {moment(this.props.date).calendar()}
      </span>
      <DoodleActionButton text="Join" />
		</div>
	}
}
