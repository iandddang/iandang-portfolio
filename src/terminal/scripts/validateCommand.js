// https://github.com/nodeca/argparse


const validateCommand = (commands, command) => {
  for (let i = 0; i < commands.length; i++){
    const commandDict = commands[i];
    const commandName = commandDict["name"]
    if (commandName === command){
      return commandDict
    }

  }

  return null
}

export default validateCommand
