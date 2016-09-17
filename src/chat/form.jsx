import React from 'react'
import animalNames from 'node-animal'
import styles from '../index.scss'

class ChatTextarea extends React.Component {
	static propTypes = {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  render() {
    return <textarea
      className={styles.textfield}
      style={{
        width: '100%',
        marginBottom: 10,
        boxSizing: 'border-box',
      }}
      value={this.props.value}
      onChange={this.props.onChange}
      placeholder="Type your message"
      rows={2}>
    </textarea>
  }
}

class ChatSubmit extends React.Component {
	static propTypes = {
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return <button
      style={{marginLeft: -5, padding: 8}}
      type="submit"
      className={styles.button}>{this.props.text}</button>
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
        <ChatTextarea onChange={e => this.setState({text: e.target.value})} value={this.state.text}/>
        <input type='hidden' value="100" ref='osmid'/>
        <input
          style={{display: 'inline-block', width: 120}}
          className={styles.textfield}
          type='text'
          onChange={e => this.setState({author: e.target.value})} value={this.state.author} />
        <ChatSubmit text="Send"/>
      </form>
    );
  }
}
