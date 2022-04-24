
// build all functions using "commands", "command", "args"
const executeCommand = (commands, command, args) => {

  function clear() {
    // .. read Terminal signal definitions
    return 100
  }

  // define functions here..
  function help() {
    let output = 'These shell commands are defined internally.  Type `help` to see this list.'
    for (let i = 0; i < commands.length; i++){
      const commandDict = commands[i]
      const commandName = commandDict['name']
      const commandDescription = commandDict['description']

      const commandOutput = commandName + "\t" + commandDescription + "<br>"
      output += commandOutput

    }

    return output

  }

  const commandExecutionDict = {
    "help": help,
    "clear": clear,
  }

  return commandExecutionDict[command]()

}

export default executeCommand
