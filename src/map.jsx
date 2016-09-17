import React from 'react'
import MapboxGl from 'mapbox-gl';
import { fullHeight } from './theme.js'

export class Map extends React.Component {
	static propTypes = {
		mapStyle: React.PropTypes.string.isRequired,
		accessToken: React.PropTypes.string,
	}

	componentDidMount() {
		MapboxGl.accessToken = this.props.accessToken

		const map = new MapboxGl.Map({
			container: this.container,
			style: this.props.mapStyle,
		});

		map.on("style.load", (...args) => {
			this.setState({ map });
		});
	}

	render() {
			return <div
				ref={x => this.container = x}
				style={{
					...fullHeight,
					width: "100%",
				}}></div>
	}
}
