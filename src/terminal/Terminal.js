import React, {Component} from 'react'
import defaults from 'defaults'
import { Shake } from 'reshake'

// Commands
import validateCommand from './scripts/validateCommand'

// Definitions
import sourceStyles from '../defs/styles/terminal/Terminal'

export default class Terminal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      commands: [
        {
          'name': 'help',
          'ArgumentParser': null,
          'description': 'Lists commands available..'
        }
      ],
      processing: false,
      stdout: [],
      shakeActive: false,
    }

    this.terminalRoot = React.createRef()
    this.terminalInput = React.createRef()
  }

  // INPUT FUNCTIONALITY

  // .. clear input
  clearInput = () => {
    this.terminalInput.current.value = ''
  }

  // .. handle input events
  handleInput = (event) => {
    // eslint-disable-next-line default-case
    switch(event.key) {
      case 'Enter': this.processInput(); break
    }
  }

  // .. process user command (input)
  processInput = () => {
    this.setState({processing: true}, async () => {
      const inputValue = this.terminalInput.current.value
      if (inputValue) {
        const inputValueSplit = inputValue.split(' ')

        // command always first arg
        const command = inputValueSplit[0]
        const args = inputValueSplit.splice(0, 1)

        // null or {...}
        const validCommandDict = validateCommand(this.state.commands, command)

        if (validCommandDict && validCommandDict.hasOwnProperty("name")){
          console.dir(validCommandDict)
          this.state.shakeActive = false;
        } else {
          this.state.shakeActive = true;
          const timer = setTimeout(() => {
            this.state.shakeActive = false;
          }, 250);
          clearTimeout(timer)
        }

        this.setState({processing: false}, () => {
          this.clearInput();
        })
      }
    })
  }

  render() {

    const styles = {
      container: defaults(this.props.style, sourceStyles.container),
      content: defaults(this.props.contentStyle, sourceStyles.content),
      input: defaults({...this.props.inputStyle, ...this.props.inputTextStyle}, {...sourceStyles.input, ...sourceStyles.inputText}),
      inputArea: defaults(this.props.inputAreaStyle, sourceStyles.inputArea),
      promptLabel: defaults(this.props.promptLabelStyle, sourceStyles.promptLabel)
    }

    return (
      <Shake
        h={10}
        v={0}
        r={0}
        q={1}
        dur={250}
        active={this.state.shakeActive}
      >
        <div
          ref={this.terminalRoot}
          style={styles.container}
        >
          <div
            style={styles.content}
          >
            <div
              style={styles.inputArea}
            >
              <span
                style={styles.promptLabel}
              >
                user@IanDangPortfolio:~$
              </span>
              <input
                autoComplete='off'
                onKeyDown={this.handleInput}
                ref={this.terminalInput}
                style={styles.input}
                type='text'
              />
            </div>
          </div>
        </div>
      </Shake>
    )
  }
}
