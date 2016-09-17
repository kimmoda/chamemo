import React from 'react'
import ReactFireMixin from 'reactfire'
import firebase from 'firebase'
import reactMixin from 'react-mixin'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBk72F0DXtewljMH6EPWaJZwL5gqGr9Kp4",
  authDomain: "chamemo-f867b.firebaseapp.com",
  databaseURL: "https://chamemo-f867b.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "567148988576"
};
var myFirebase = firebase.initializeApp(config);

var Message = React.createClass({
  render: function () {
    return (
      <MessageBubble
        author={this.props.author}
        timestamp={this.props.timestamp}
        message={this.props.children.toString()}>
      </MessageBubble>
    );
  }
});


var MessageList = React.createClass({
  render: function () {
    var messageNodes = this.props.data.map(function (message, index) {
      return <Message key={index} author={message.author}
                      timestamp={(new Date(message.timestamp)).toUTCString()}>{message.text}</Message>;
    });
    return <div className='messageList'>{messageNodes}</div>;
  }
});

class MessageBubble extends React.Component {
  render() {
    return <div>
      <div style={{paddingBottom: 10}}>
        <span>{this.props.author}</span>
        <span style={{color: '#a8aab1', paddingLeft: 6}}>10:20 AM, Today</span>
      </div>
      <div style={{
				padding: 7,
				backgroundColor: '#86BB71',
				color: 'white',
				borderRadius: 7,
				width: '90%',
				marginBottom: 30,
				lineHeight: '26px',
			}}>
        {this.props.message}
      </div>
    </div>
  }
}

class ChatTextarea extends React.Component {
  render() {
    return <textarea
      style={{
        fontSize: 16,
        borderRadius: 5,
        border: 'none',
        resize: 'none',
        padding: 10,
        width: '100%',
        boxSizing: 'border-box',
      }}
      value={this.props.value}
      onChange={this.props.onChange}
      placeholder="Type your message"
      rows={3}>
    </textarea>
  }
}

class ChatSubmit extends React.Component {
  render() {
    return <button
      type="submit"
      style={{
        color: '#94C2ED',
        textTransform: 'uppercase',
        display: 'block',
      }}>{this.props.text}</button>
  }
}

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {author: this.getName(), text: ''}
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onMessageSubmit({author: this.state.author, text: this.state.text, timestamp: {".sv": "timestamp"}});
    this.setName(this.state.author)
  }


  getName() {
    return localStorage.getItem('name') || "Username";
  }


  setName(name) {
    localStorage.setItem('name', name)
  }


  render() {
    return (
      <form className='messageForm' onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' onChange={e => this.setState({author: e.target.value})} value={this.state.author}/>
        <ChatTextarea onChange={e => this.setState({text: e.target.value})} value={this.state.text}/>
        <input type='hidden' value="100" ref='osmid'/>
        <ChatSubmit text="Send"/>
      </form>
    );
  }
}


export class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []}
  }

  componentWillReceiveProps(nextProps) {
    this.unbind('data');
    this.bindOsmid(nextProps.osmid);
  }

  handleMessageSubmit(message) {
    this.firebaseRefs['data'].push(message);
  }


  componentWillMount() {
    this.bindOsmid(this.props.osmid);
  }

  bindOsmid(osmid) {
    this.bindAsArray(firebase.database().ref('messageBox').child(osmid), 'data');
  }

  render() {
    return (
      <div className='messageBox'>
        <MessageList data={this.state.data}/>
        <MessageForm onMessageSubmit={this.handleMessageSubmit.bind(this)}/>
      </div>
    );
  }
}


reactMixin(MessageBox.prototype, ReactFireMixin)
