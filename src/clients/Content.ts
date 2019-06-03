import Messaging from "../messaging"
import Message, { IMessageContent } from "../message"
import Commands, { ICommandMap } from "./Commands"

export default class ContentClient extends Messaging {
  commands: Commands
  constructor(name: string, commands: ICommandMap) {
    super()
    this.name = `${name}:content`
    this.commands = new Commands(this, commands)
  }

  listenForMessages() {
    chrome.runtime.onMessage.addListener(msg => this.onReceive(msg))
  }

  sendMessage(msg: Message) {
    chrome.runtime.sendMessage(msg)
  }

  handleIncomingMessage(msg: Message): boolean {
    return this.commands.handleIncomingMessage(msg)
  }
}
