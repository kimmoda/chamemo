import React from 'react'

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
		return <div onClick={() => alert('show poll ' + this.props.id)}>
			<h1>{this.props.date}</h1>
			<p>{this.props.title}</p>
		</div>
	}
}
