import Messaging from "../messaging"
import Message, { IMessageContent } from "../message"

export type ICommands = {
  [name: string]: (
    msg: Message,
    callback: (error: Error | undefined, result?: IMessageContent) => void
  ) => void
}

export default class BackgroundClient extends Messaging {
  commands: ICommands
  constructor(name: string, commands: ICommands) {
    super()
    this.name = `${name}:background`
    this.commands = commands
  }

  listenForMessages() {
    chrome.runtime.onMessage.addListener(msg => this.onReceive(msg))
  }

  sendMessage(msg: Message) {
    chrome.runtime.sendMessage(msg)
  }

  handleIncomingMessage(msg: Message): boolean {
    const cmd = msg.content["command"] as string

    if (this.commands[cmd]) {
      this.commands[cmd](
        msg,
        (error: Error | undefined, result?: IMessageContent) => {
          if (error) {
            return this.reply(msg, {
              to: msg.origin,
              content: {},
              error: error.message
            })
          }

          return this.reply(msg, {
            to: msg.origin,
            content: result as IMessageContent
          })
        }
      )

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
