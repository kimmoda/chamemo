import React from 'react'
import 'react-date-picker/index.css'
import animalNames from 'node-animal'
import { DateField, DatePicker } from 'react-date-picker'
import styles from './index.scss'

class DoodleButton extends React.Component {
	static propTypes = {
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  }

  render() {
    return <button
      className={styles.button}
      onClick={this.props.onClick}
      style={{
        display: 'block',
        marginTop: 10,
        marginBottom: 20,
      }}>{this.props.text}</button>
  }
}

export class DoodleForm extends React.Component {
	static propTypes = {
		onNewDoodle: React.PropTypes.func.isRequired
	}

  constructor(props) {
    super(props)
    this.state = {
			date: Date.now()
    }
  }

	onDateChange(dateString, { dateMoment, timestamp}) {
		console.log(dateString, dateMoment, timestamp)
		console.log(timestamp)
		this.setState({
			date: dateMoment,
		})
	}

	onCreate(e) {
		this.props.onNewDoodle(this.state.date)
		this.setState({
			title: animalNames.rand(),
			date: Date.now()
		})
	}

	render() {
		return <div>
			<DateField
				dateFormat="YYYY-MM-DD HH:mm:ss"
				forceValidDate={true}
        defaultValue={Date.now()}
				style={{
          borderColor: 'transparent',
          backgroundColor: '#e8eeef',
          fontSize: 16,
          borderRadius: 5,
					color: '#444',
				}}
			>
				<DatePicker
					onChange={this.onDateChange.bind(this)}
					navigation={true}
					locale="en"
					forceValidDate={true}
					highlightWeekends={true}
					highlightToday={true}
					weekStartDay={1}
				/>
			</DateField>
    	<DoodleButton text="Propose meeting" onClick={this.onCreate.bind(this)} />
		</div>
	}
}
