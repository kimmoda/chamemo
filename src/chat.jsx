import React from 'react'
import Section from 'rebass/dist/Section'
import Card from 'rebass/dist/Card'
import { Message } from './message'
import { NewPost } from './post'

export class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       messages: [{
        username: 'luca',
        text: 'hey'
       }, {
        username: 'samuel',
        text: 'lets hack'
       }]
    }
  }

  onNewMessage(newMsg) {
    const msgs = this.state.messages
    msgs.push({
      username: 'New',
      text: newMsg,
    })
    this.setState({
      messages: msgs
    })
  }

  render() {
    const msgs = this.state.messages.map(m => <Message key={m.username + m.text} username={m.username} text={m.text} />)

    return <div style={{
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: 1000,
      left: 0,
      right: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 500,
      height: 300}}>
      {msgs}
      <NewPost onNewMessage={this.onNewMessage.bind(this)}/>
    </div>
	}
}
