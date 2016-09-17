import React from 'react'
import Drawer from 'rebass/dist/Drawer'
import Container from 'rebass/dist/Container'
import Block from 'rebass/dist/Block'
import Fixed from 'rebass/dist/Fixed'
import { MessageBox } from './messagebox'
import firebase from 'firebase'

import { Map } from './map.jsx'
import { DoodleList } from './doodlelist'

import theme from './theme.js'


export default class App extends React.Component {
  static childContextTypes = {
    rebass: React.PropTypes.object,
    reactIconBase: React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  getChildContext() {
    return {
      rebass: theme,
      reactIconBase: {size: 20}
    }
  }

  render() {
    return <div style={{ fontFamily: theme.fontFamily, color: theme.color, fontWeight: 300 }}>
      <DoodleList />
      <div style={{
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 1000,
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 500,
      height: 300}}>
        <MessageBox />
      </div>
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v9"
        accessToken="pk.eyJ1IjoibW9yZ2Vua2FmZmVlIiwiYSI6IjIzcmN0NlkifQ.0LRTNgCc-envt9d5MzR75w"
      />
    </div>
  }
}
