import React from 'react'
import MapboxGl from 'mapbox-gl';
import { fullHeight } from './theme.js'
import pointOnSurface from 'turf-point-on-surface'

function findPitches(map, point) {
  return map.queryRenderedFeatures(point, {
    layers: ['pitch_label'],
  });
}

export class Map extends React.Component {
  static propTypes = {
    // If a sport pitch is selected the OSM id of that
    // pitch is passed to onPitchClick
    onPitchClick: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    // The map only exists once a style has been loaded successfully
    this.state = { map: null }
  }

  componentDidMount() {
    MapboxGl.accessToken = 'pk.eyJ1IjoiZHJlaXBvbC1kZXYiLCJhIjoiY2lybWVqbjk0MDAzcGh4a3cwazRqMmZiaiJ9._WoL85pLqrKBNjSCjHevQg'

    const map = new MapboxGl.Map({
      container: this.container,
      style: 'mapbox://styles/dreipol-dev/cit74jos9000y2yohc0gmc5pn',
      zoom: 17,
      hash: true,
      center: [8.987,47.223],
    });

    // Find most likely clicked feature and extract OSM ID
    map.on("click", e => {
      const features = findPitches(map, e.point)
      if (!features.length) return
      const clickedFeature = features[0]
      this.props.onPitchClick(clickedFeature.properties)
    });

    // Indicate clickable symbols
    map.on('mousemove', function (e) {
      const features = findPitches(map, e.point);
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });

    map.on("style.load", (...args) => this.setState({ map }));
  }

  render() {
    return <div
      ref={x => this.container = x}
      style={{ ...fullHeight, width: "100%" }}
    ></div>
  }
}
