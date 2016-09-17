import React from 'react'
import animalNames from 'node-animal'

class ChatTextarea extends React.Component {
	static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

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
	static propTypes = {
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return <button
      type="submit"
      style={{
        color: '#94C2ED',
        textTransform: 'uppercase',
        display: 'block',
        backgroundColor: '#e8eeef',
        fontSize: '16px',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        border: 'none',
      }}>{this.props.text}</button>
  }
}

export default class MessageForm extends React.Component {
	static propTypes = {
    onMessageSubmit: React.PropTypes.func.isRequired,
  }

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
    let name = localStorage.getItem('name')
    if(!name) {
      name = animalNames.rand()
      this.setName(name)
    }
    return name
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
