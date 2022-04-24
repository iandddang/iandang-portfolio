// https://github.com/nodeca/argparse


export default (commands, command) => {
  for (var i = 0; i < commands.length; i++){
    const commandDict = commands[i];
    const commandName = commandDict["name"]
    if (commandName === command){
      return commandDict
    }

  }

  return null
}
