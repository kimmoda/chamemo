import React from 'react'
import MessageBox from './chat/box'
import firebase from 'firebase'

import { Map } from './map.jsx'
import { DoodleList } from './doodlelist'

import theme from './theme.js'
import { fullHeight } from './theme.js'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {osmId: null}
  }

  render() {
    let drawer = null

    if (this.state.osmId !== null) {
      drawer = <div style={{
        ...fullHeight,
        boxShadow: '#ddd 2px 2px 8px 0px',
        backgroundColor: '#F2F5F8',
        zIndex: 1000,
        left: 0,
        width: 500,
        }}
      >
        <div style={{...fullHeight, padding: 10, backgroundColor: '#eef2f3', width: 230, display: 'inline-block'}}>
          <MessageBox osmId={this.state.osmId}/>
        </div>
        <div style={{...fullHeight, left: 250, padding: 10, width: 230, display: 'inline-block'}}>
          <DoodleList osmid={this.state.osmId} sport={this.state.sport}/>
        </div>
      </div>
    }

    return <div style={{ fontFamily: theme.fontFamily, color: '#fff'}}>
      {drawer}
      <Map onPitchClick={pitch => {
          console.log(pitch.osm_id)
          this.setState({osmId: pitch.osm_id, sport: pitch.sport})
        }
      }/>
    </div>
  }
}
