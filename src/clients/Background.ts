import Messaging from "../messaging"
import Message from "../message"

export type ICommands = {
  [name: string]: (msg: Message, client: BackgroundClient) => void
}

export default class BackgroundClient extends Messaging {
  commands: ICommands
  constructor(name: string) {
    super()
    this.name = `${name}:background`
    this.commands = {}
  }

  defineCommands(commands: ICommands) {
    this.commands = {}

    for (let name in commands) {
      this.commands[name] = commands[name]
    }
  }

  handleIncomingMessage(msg: Message): boolean {
    if (this.commands[msg.content["command"]]) {
      this.commands[msg.content["command"]](msg, this)
      return true
    }

    this.reply(msg, {
      to: msg.origin,
      content: {},
      error: `Unrecognized command: ${msg.content["command"]}`
    })

    return false
  }
}
