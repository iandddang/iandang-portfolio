import React, {Component} from 'react'
import defaults from 'defaults'
import { Shake } from 'reshake'

// Commands
import validateCommand from './scripts/validateCommand'
import executeCommand from './scripts/executeCommand'

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
        },
        {
          'name': 'clear',
          'ArgumentParser': 'null',
          'description': 'Clears stdout..'
        },
      ],
      processing: false,
      stdout: [],
      shakeActive: false,
    }

    this.terminalRoot = React.createRef()
    this.terminalInput = React.createRef()
  }

  // SIGNAL FUNCTIONALITY

  emitSignal = (signalNumber) => {
    return this.signalDict[signalNumber]()
  }

  // STATE FUNCTIONALITY

  clearStdout = () => {
    this.setState({'stdout': []})
  }

  pushStdout = (item) => {
    var stdoutArray = this.state.stdout.slice()
    stdoutArray.push(item)
    this.setState({'stdout': stdoutArray})
  }

  getStdoutArray = () => {
    return this.state.stdout.slice()
  }

  getStdoutTerminal = () => {
    var stdoutArray = this.state.stdout.slice()
    let output = ''
    if (stdoutArray.length > 0) {
      output = stdoutArray.flatMap((item, i) => [
        <p key={i}
        >
          {item}<br/>
        </p>,
        ''
      ])
    }

    return output
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
          let commandOutput = executeCommand(this.state.commands, command, args)
          if (typeof commandOutput === 'string'){
            this.pushStdout(commandOutput)
          } else if (typeof commandOutput === 'number'){
            this.emitSignal(commandOutput)
          }
        } else {
          this.state.shakeActive = true;
          const timer = setTimeout(() => {
            this.state.shakeActive = false;
          }, 250);
          clearTimeout(timer)
        }

        this.setState({processing: false}, () => {
          this.clearInput();
          console.dir(this.state.stdout)
        })
      }
    })
  }

  // CONSTANTS
  signalDict = {
    100: this.clearStdout
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
            {this.getStdoutTerminal()}
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
