import React from 'react'
import moment from 'moment'

// A single message from an author at a given time
class Message extends React.Component {
	static propTypes = {
    timestamp: React.PropTypes.number.isRequired,
    author: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
  }

  render() {
    const timeAgo = moment(this.props.timestamp).fromNow()
    return <div>
      <div style={{paddingBottom: 5, fontSize: 12}}>
        <span>{this.props.author}</span>
        <span style={{color: '#a8aab1', paddingLeft: 6}}>{timeAgo}</span>
      </div>
      <div style={{
				padding: 7,
				backgroundColor: '#86BB71',
				color: 'white',
				borderRadius: 7,
				width: '90%',
				marginBottom: 10,
				lineHeight: '26px',
			}}>
        {this.props.message}
      </div>
    </div>
  }
}

export default Message
