import React from 'react'
import moment from 'moment'
import styles from '../index.scss'

// A single message from an author at a given time
class Message extends React.Component {
	static propTypes = {
    timestamp: React.PropTypes.number.isRequired,
    author: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
  }

  render() {
    const timeAgo = moment(this.props.timestamp).fromNow()
    return <div style={{ width: '90%' }}>
      <div className={styles.messageHeader}>
        <span className={styles.messageAuthor}>{this.props.author}</span>
        <span className={styles.messageDate}>{timeAgo}</span>
      </div>
      <div className={styles.messageContent}>
        {this.props.message}
      </div>
    </div>
  }
}

export default Message
