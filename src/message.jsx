import React from 'react'

import { Flex, Box } from 'reflexbox'
import Icon from 'react-geomicons'

export class Message extends React.Component {
	static propTypes = {
    username: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
  }

  render() {
		return <div>
			<bold>{this.props.username}</bold>: {this.props.text}
		</div>
	}
}
