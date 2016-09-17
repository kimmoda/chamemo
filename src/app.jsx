import React from 'react'
import { MessageBox } from './messagebox'
import firebase from 'firebase'

import { Map } from './map.jsx'
import { DoodleList } from './doodlelist'

import theme from './theme.js'
import { fullHeight } from './theme.js'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {osmid: null}
  }

  render() {
    let drawer = null

    if (this.state.osmid) {
      drawer = <div style={{
        ...fullHeight,
        boxShadow: '#ddd 2px 2px 8px 0px',
        backgroundColor: '#F2F5F8',
        zIndex: 1000,
        left: 0,
        width: 300,
        padding: 20 }}>
        <MessageBox osmid={this.state.osmid}/>
        <DoodleList osmid={this.state.osmid} />
      </div>
    }
    return <div style={{ fontFamily: theme.fontFamily, color: theme.color, fontWeight: 300 }}>
      {drawer}
      <Map onPitchClick={pitch => {
          this.setState({osmid: pitch.osm_id});
        }
      }/>
    </div>
  }
}
