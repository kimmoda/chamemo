import React from 'react'
import MapboxGl from 'mapbox-gl';
import { fullHeight } from './theme.js'

function findSportAreas(map) {
  return map.querySourceFeatures('composite', {
    sourceLayer: 'landuse',
    filter: ['in', 'class', 'pitch']
  })
}

export class Map extends React.Component {
	static propTypes = {
		mapStyle: React.PropTypes.string.isRequired,
		accessToken: React.PropTypes.string,
	}

  constructor(props) {
    super(props)
    this.state = {
      sportAreas: []
    }
    this.updateSportAreas = this.updateSportAreas.bind(this)
  }

  updateSportAreas() {
      this.setState({
        sportAreas: findSportAreas(this.state.map)
      })
  }

	componentDidMount() {
		MapboxGl.accessToken = this.props.accessToken

		const map = new MapboxGl.Map({
			container: this.container,
			style: this.props.mapStyle,
      zoom: 17,
      hash: true,
      center: [9.02728, 47.21423],
		});

    map.on('moveend', this.updateSportAreas)
    map.on('dragend', this.updateSportAreas)
    map.on('zoomend', this.updateSportAreas)

		map.on("style.load", (...args) => {
			this.setState({ map });
		});
	}

	render() {
      console.log(this.state.sportAreas)
			return <div
				ref={x => this.container = x}
				style={{
					...fullHeight,
					width: "100%",
				}}></div>
	}
}
