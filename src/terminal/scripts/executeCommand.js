import React, {Component} from 'react'

// build all functions using "commands", "command", "args"
const executeCommand = (commands, command, args) => {

  function clear() {
    // .. read Terminal signal definitions
    return 100
  }

  // define functions here..
  function help() {
    let helpHeader = 'Command.......... '
    let output = 'These shell commands are defined internally.\nType `help` to see this list.\n==============================\n' + helpHeader + 'Description\n'
    for (let i = 0; i < commands.length; i++){
      const commandDict = commands[i]
      const commandName = commandDict['name']
      const commandDescription = commandDict['description']

      let ellipsesLength = helpHeader.length - commandName.length - 1
      const commandOutput = commandName + ".".repeat(ellipsesLength) + ' ' + commandDescription + "\n"
      output += commandOutput

    }

    return output

  }

  function about() {
    let output = ''

    output += '=========================================================================\n'
    output += '==================================  ABOUT  ================================\n'
    output += '=========================================================================\n'
    output += 'Hi, my name is Ian Dang and thank you so much for visiting my website!\n'
    output += 'I am a software engineer residing in Orange County, California.\n'
    output += 'This is my portfolio, made in ReactJS, that I plan to update regularly.\n'
    output += '=========================================================================\n'
    output += '============================= TECHNOLOGIES ==============================\n'
    output += '=========================================================================\n'
    output += '======== LANGUAGES: Python 2 + 3, C, Java, JavaScript, Bash, SQL\n'
    output += '======== FOCUSES: Automation, Scripting, Scraping, REST APIs\n'
    output += '======== FOCUSES 2: Microservices, System Design/Architecture\n'
    output += '======== DB: PostgreSQL, MongoDB\n'
    output += '======== FRONTEND: Angular, React\n'
    output += '======== OS: Linux, Windows, OSX\n'
    output += '======== DEVOPS Tools: Jenkins, Docker, Prometheus, Grafana\n'
    output += '======== DEVOPS Tools 2: NginX, Elastic Stack, AWS\n'
    output += '======== PARADIGMS: Cloud Computing, Distributed Systems, CI/CD\n'
    output += '======== HIPAA-COMPLIANT, PRODUCTION DEVOPS: ✔\n'
    output += '===========================================================================\n'
    output += '================================ WORK EXP =================================\n'
    output += '===========================================================================\n'
    output += '======== [Huntington Beach, CA] Voluware SWE 3 (2019 to XXXX)\n'
    output += 'https://voluware.com\n...\n'
    output += '\n======== [Newport Beach, CA] Zulu Quant SWE Intern (2018 to 2019)\n'
    output += 'n/a\n'
    output += '===========================================================================\n'
    output += '================================ EDUCATION ================================\n'
    output += '===========================================================================\n'
    output += 'University of California, Irvine (2019)\n'
    output += 'Computer Engineering, B.S.\n'
    output += '===========================================================================\n'
    output += '=================================== RESUME ================================\n'
    output += '===========================================================================\n'
    output += '======== TBD\n'
    output += '===========================================================================\n'
    output += '================================== CONTACT ================================\n'
    output += '===========================================================================\n'
    output += '======== LINKEDIN\n'
    output += 'https://www.linkedin.com/in/ian-dang\n...\n'
    return output
  }

  function shrimp() {

    const shrimpAscii = `
    __________________________________________________________________
    __________________________________________________________________
    __________________________________________________________________
    __________________________________________________________________
    __________________________________________________________________
    ________________________████████████______________________________
    ____________________████▓▓__▓▓__▓▓__██▓▓████████__________________
    __________________██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓__████████______________
    ____██__________██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓██____________
    ______██______██▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓__██__________
    ________██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓__██________
    ________██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓▓▓▓▓▓▓__██______
    ______██__████▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓████▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓████______
    ____▓▓________▓▓████████▓▓______________████▓▓▓▓▓▓▓▓████▓▓██______
    ____________________________________________████████▓▓▓▓░░░░______
    ________________________________________________██░░▓▓▓▓▓▓██______
    ________________________________________________██░░░░░░████______
    ____________________________________________████▓▓▓▓████░░██______
    ____________________________________________████████▓▓▓▓░░██______
    ________________________████████__________██▓▓▓▓▓▓▓▓▓▓░░██________
    ______________________██▓▓▓▓▓▓▓▓██____████▓▓████░░░░░░██__________
    ______________________██▓▓▓▓▓▓░░░░████░░░░░░░░░░██████____________
    ______________________██▓▓░░░░████▓▓████████████__________________
    ________________________▓▓████░░░░██______________________________
    ______________________██▓▓▓▓▓▓░░░░██______________________________
    ______________________██▓▓░░░░░░██________________________________
    ________________________██████▓▓__________________________________
    ________________________░░░░▓▓▓▓__________________________________
    __________________________________________________________________
    __________________________________________________________________
    __________________________________________________________________
    __________________________________________________________________
    `

    return shrimpAscii + '\nAt the start of the pandemic, I stepped foot into the freshwater aquarium hobby!\n----> View my public collection of images/videos here...\nhttps://www.instagram.com/aquamaynn/?hl=en\n...\n'
  }


  const commandExecutionDict = {
    "help": help,
    "clear": clear,
    "about": about,
    "shrimp": shrimp,
  }

  return commandExecutionDict[command]()

}

export default executeCommand
