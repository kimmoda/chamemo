import React from 'react'
import ReactFireMixin from 'reactfire'
import firebase from 'firebase'
import Showdown from 'showdown'


// Initialize Firebase
var config = {
  apiKey: "AIzaSyBk72F0DXtewljMH6EPWaJZwL5gqGr9Kp4",
  authDomain: "chamemo-f867b.firebaseapp.com",
  databaseURL: "https://chamemo-f867b.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "567148988576"
};
var myFirebase = firebase.initializeApp(config);
var converter = new Showdown.Converter();

var Message = React.createClass({
  render: function () {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className='message'>
        <h2 className='messageAuthor'>{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}}/>
      </div>
    );
  }
});


var MessageList = React.createClass({
  render: function () {
    var messageNodes = this.props.data.map(function (message, index) {
      return <Message key={index} author={message.author}>{message.text}</Message>;
    });
    return <div className='messageList'>{messageNodes}</div>;
  }
});


class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {author: this.getName(), text: ''}
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onMessageSubmit({author: this.state.author, text: this.state.text});
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
        <input type='text' onChange={e => this.setState({text: e.target.value})} value={this.state.text}/>
        <input type='hidden' value="100" ref='osmid'/>
        <input type='submit' value='Post'/>
      </form>
    );
  }
}


export var MessageBox = React.createClass({
  mixins: [ReactFireMixin],

  handleMessageSubmit: function (message) {
    // Here we push the update out to Firebase and let ReactFire update this.state.data
    this.firebaseRefs['data'].push(message);
  },

  getInitialState: function () {
    return {
      data: []
    };
  },

  componentWillMount: function () {
    // Here we bind the component to Firebase and it handles all data updates,
    // no need to poll as in the React example.
    var firebaseRef = firebase.database().ref('messageBox');
    this.bindAsArray(firebaseRef.child('200'), 'data');
  },

  render: function () {
    return (
      <div className='messageBox'>
        <h1>Messages</h1>
        <MessageList data={this.state.data}/>
        <MessageForm onMessageSubmit={this.handleMessageSubmit}/>
      </div>
    );
  }
});


