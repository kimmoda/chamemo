import React from 'react'
import Message from './message'

// Ensure div is scrolled down
function scrollDown(div) {
  if(div) {
    div.scrollTop = div.scrollHeight
  }
}

export default class MessageList extends React.Component {
	static propTypes = {
    messages: React.PropTypes.array.isRequired,
  }

  render() {
      var messages = this.props.messages.map((msg, idx) => {
      return <Message
        key={idx}
        author={msg.author}
        timestamp={msg.timestamp}
        message={msg.text}>
      </Message>
    })

    return <div
      ref={scrollDown}
      style={{
        maxHeight: '370px',
        overflowY: 'scroll',
      }}>
    {messages}
    </div>
  }
}
