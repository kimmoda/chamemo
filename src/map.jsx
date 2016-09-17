import React from 'react'
import MapboxGl from 'mapbox-gl';
import { fullHeight } from './theme.js'
import pointOnSurface from 'turf-point-on-surface'

function findSportSpots(map, point) {
  return map.queryRenderedFeatures(point, {
    layers: ['pitch_label'],
    filter: ['in', 'class', 'pitch']
  });
}

export class Map extends React.Component {
	static propTypes = {
	}

  constructor(props) {
    super(props)
    this.state = {
      sportAreas: []
    }
  }

	componentDidMount() {
		MapboxGl.accessToken = 'pk.eyJ1IjoiZHJlaXBvbC1kZXYiLCJhIjoiY2lybWVqbjk0MDAzcGh4a3cwazRqMmZiaiJ9._WoL85pLqrKBNjSCjHevQg'

		const map = new MapboxGl.Map({
			container: this.container,
			style: 'mapbox://styles/dreipol-dev/cit70esdx000u2yohtpwzu13l',
      zoom: 17,
      hash: true,
      center: [9.02728, 47.21423],
		});

		map.on("click", e => {
				const features = findSportSpots(map, e.point)

        if (!features.length) return
				var feature = features[0];
				var popup = new MapboxGl.Popup()
								.setLngLat(feature.geometry.coordinates)
								.setHTML('Hey')
								.addTo(map);
    });

		// Use the same approach as above to indicate that the symbols are clickable
		// by changing the cursor style to 'pointer'.
		map.on('mousemove', function (e) {
				var features = findSportSpots(map, e.point);
				map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
		});

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
