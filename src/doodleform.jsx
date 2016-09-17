import React from 'react'

export class DoodleForm extends React.Component {
	static propTypes = {
		onNewDoodle: React.PropTypes.func.isRequired
	}

  constructor(props) {
    super(props)
    this.state = {
      title: '',
			date: 0
    }
  }

	onTextChange(e) {
		this.setState({
			title: e.target.value
		})
	}

	onDateChange(e) {
		this.setState({
			date: e.target.value
		})
	}

	onCreate(e) {
		this.props.onNewDoodle(this.state.title, this.state.date)
		this.setState({
			title: '',
			date: 0
		})
	}

	render() {
		return <div>
			<input type="text" value={this.state.title} onChange={this.onTextChange.bind(this)} />
			<input type="number" value={this.state.date} onChange={this.onDateChange.bind(this)} />
			<button type="button" onClick={this.onCreate.bind(this)}>Create</button>
		</div>
	}
}
