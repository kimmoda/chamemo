import React from 'react'

export class NewPost extends React.Component {
	static propTypes = {
    onNewMessage: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  onButtonClick() {
    this.props.onNewMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  onTextChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  render() {
		return <div>
      <input type="text" value={this.state.message} onChange={this.onTextChange.bind(this) } />
      <button onClick={this.onButtonClick.bind(this)}>Post</button>
		</div>
	}
}
