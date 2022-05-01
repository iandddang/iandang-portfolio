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
    this.welcomeStdoutArray = ["Welcome to Ian's Portfolio!", "Type `help` in the terminal to get started..", "https://github.com/iandddang/iandang-portfolio\n...\n"]
    this.state = {
      // TODO: **NOT URGENT, refactor all commands into validateCommand/executeCommand
      commands: [
        {
          'name': 'help',
          'ArgumentParser': null,
          'description': 'Lists commands available'
        },
        {
          'name': 'clear',
          'ArgumentParser': 'null',
          'description': 'Clears stdout'
        },
        {
          'name': 'about',
          'ArgumentParser': 'null',
          'description': 'Who is Ian Dang'
        },
        {
          'name': 'shrimp',
          'ArgumentParser': 'null',
          'description': 'Shrimp surprise :)'
        },
      ],
      processing: false,
      stdout: this.welcomeStdoutArray,
      shakeActive: false,
    }

    this.terminalRoot = React.createRef()
    this.terminalInput = React.createRef()
    this.terminalInputRoot = React.createRef()
  }

  // SIGNAL FUNCTIONALITY

  emitSignal = (signalNumber) => {
    return this.signalDict[signalNumber]()
  }

  // STATE FUNCTIONALITY
  clearStdout = () => {

    return new Promise(resolve => {
      this.setState({'stdout': this.welcomeStdoutArray}, () => resolve())
    })

  }

  pushStdout = (item) => {
    var stdoutArray = this.state.stdout.slice()
    stdoutArray.push(item)

    return new Promise(resolve => {
      this.setState({'stdout': stdoutArray}, () => resolve())
    })
  }

  getStdoutArray = () => {
    return this.state.stdout.slice()
  }

  getStdoutTerminal = () => {
    var stdoutArray = this.state.stdout.slice()
    let itemElements = []

    for (let i = 0; i < stdoutArray.length; i++) {

      let item = stdoutArray[i]
      let itemSplit = item.split('\n')
      for (let y = 0; y < itemSplit.length; y++) {
        let split = itemSplit[y]
        if(Boolean(split) && split.includes('https')) {
          itemElements.push(<a style={sourceStyles.a} target="_blank" rel='noopener noreferrer' href={split}>{split}</a>)
        } else if (Boolean(split)) {
          itemElements.push(split + '\n')
        }
      }
      itemElements.push(<br/>)
    }
    itemElements.push(<br/>)

    return (
      <div>
        {itemElements}
      </div>
    )
  }

  shakeActivate = async () => {
    return new Promise(resolve => {
      this.setState({'shakeActive': true}, async () => {
        setTimeout(() => {
          this.setState({'shakeActive': false}, () => {
            resolve()
          })
        }, 350)
      })
    })

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
      let inputValue = this.terminalInput.current.value
      if (inputValue) {
        let inputValueSplit = inputValue.split(' ')

        // command always first arg
        let command = inputValueSplit[0]
        let args = inputValueSplit.splice(0, 1)

        // push command history, always
        let commandHeader = "\n" + this.terminalInputRoot.current.textContent + " " + command;
        await this.pushStdout(commandHeader)

        // null or {...}
        let validCommandDict = validateCommand(this.state.commands, command)

        if (validCommandDict && validCommandDict.hasOwnProperty("name")){
          let commandOutput = executeCommand(this.state.commands, command, args)

          if (typeof commandOutput === 'string'){
            await this.pushStdout(commandOutput)
          } else if (typeof commandOutput === 'number'){
            this.emitSignal(commandOutput)
          }
        } else {
          let commandFailStr = '\n`' + command + '` is not a valid command.\nType `help` to see available commands.'
          await this.pushStdout(commandFailStr)
          await this.shakeActivate()
        }

        this.setState({processing: false}, () => {
          this.clearInput();
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
        h={15}
        v={1}
        r={0}
        q={1}
        dur={350}
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
              ref={this.terminalInputRoot}
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
