import React from 'react'
import { MessageBox } from './messagebox'
import firebase from 'firebase'

import { Map } from './map.jsx'
import { DoodleList } from './doodlelist'

import theme from './theme.js'
import { fullHeight } from './theme.js'


export default class App extends React.Component {
  render() {
    return <div style={{ fontFamily: theme.fontFamily, color: theme.color }}>
      <div style={{
      ...fullHeight,
      boxShadow: '#ddd 2px 2px 8px 0px',
      backgroundColor: '#F2F5F8',
      zIndex: 1000,
      left: 0,
      width: 300,
      padding: 20 }}>
        <MessageBox osmid={200}/>
        <DoodleList />
      </div>
      <Map onPitchClick={pitch => console.log('Pitch clicked', pitch)}/>
    </div>
  }
}
