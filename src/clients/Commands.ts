import Messaging from "../messaging"
import Message, { IMessageContent } from "../message"

export type ICommand = (
  msg: Message,
  callback: (error: Error | undefined, result?: IMessageContent) => void
) => void

export type ICommandMap = {
  [name: string]: ICommand
}

export default class Commands {
  client: Messaging
  map: ICommandMap
  constructor(client: Messaging, map: ICommandMap) {
    this.map = map
    this.client = client
  }

  get(cmd: string): ICommand | undefined {
    return this.map[cmd]
  }

  handleIncomingMessage(msg: Message): boolean {
    const name = msg.content["command"] as string
    const commandFn = this.get(name)

    if (!commandFn) {
      this.client.reply(msg, {
        to: msg.origin,
        content: {},
        error: `Unrecognized command: ${msg.content["command"]}`
      })

      return false
    }

    commandFn(msg, (error: Error | undefined, result?: IMessageContent) => {
      if (error) {
        return this.client.reply(msg, {
          to: msg.origin,
          content: {},
          error: error.message
        })
      }

      return this.client.reply(msg, {
        to: msg.origin,
        content: result as IMessageContent
      })
    })

    return true
  }
}
