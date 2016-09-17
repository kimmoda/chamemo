import React from 'react'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin'
import firebase from 'firebase'
import MessageList from './list'
import MessageForm from './form'
import styles from '../index.scss'

export default class MessageBox extends React.Component {
	static propTypes = {
    osmId: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.chatRef = firebase.database().ref('chat')
    this.state = { messages: [] }
  }

  componentWillReceiveProps(nextProps) {
    this.unbind('messages');
    this.bindOsmId(nextProps.osmId);
  }

  handleMessageSubmit(message) {
    this.firebaseRefs['messages'].push(message);
  }


  componentWillMount() {
    this.bindOsmId(this.props.osmId);
  }

  bindOsmId(osmId) {
    const locationRef = this.chatRef.child(osmId)
    this.bindAsArray(locationRef, 'messages');
  }

  render() {
    return (
      <div>
        <h2 className={styles.title}>Chat</h2>
        <MessageList messages={this.state.messages}/>
        <MessageForm onMessageSubmit={this.handleMessageSubmit.bind(this)}/>
      </div>
    );
  }
}

reactMixin(MessageBox.prototype, ReactFireMixin)
