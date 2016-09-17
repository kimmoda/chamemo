import React from 'react'
import 'react-date-picker/index.css'
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
      title: 'affegsicht',
			date: 1562053600000
    }
  }

	onTextChange(e) {
		this.setState({
			title: e.target.value
		})
	}

	onDateChange(dateString, { dateMoment, timestamp}) {
		console.log(dateString, dateMoment, timestamp)
		console.log(timestamp)
		this.setState({
			date: dateMoment,
		})
	}

	onCreate(e) {
		this.props.onNewDoodle(this.state.title, this.state.date)
		this.setState({
			title: 'affegsicht',
			date: 1562053600000
		})
	}

	render() {
		return <div>
			<DateField
				dateFormat="YYYY-MM-DD HH:mm:ss"
				forceValidDate={true}
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
    <DoodleButton text="Propose meeting" />
			<input type="text" value={this.state.title} onChange={this.onTextChange.bind(this)} />
			<button type="button" onClick={this.onCreate.bind(this)}>Create</button>
		</div>
	}
}
