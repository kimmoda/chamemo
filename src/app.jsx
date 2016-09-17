import React from 'react'

import Drawer from 'rebass/dist/Drawer'
import Container from 'rebass/dist/Container'
import Block from 'rebass/dist/Block'
import Fixed from 'rebass/dist/Fixed'
import { CommentBox } from './comment'

import { Map } from './map.jsx'
import { Chat } from './chat'
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
			reactIconBase: { size: 20 }
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
        <CommentBox />
      </div>
			<Map />
		</div>
	}
}
