import Messaging from "../messaging"
import Message, { IMessageContent } from "../message"
import Commands, { ICommandMap } from "./Commands"

export default class BackgroundClient extends Messaging {
  commands: Commands
  constructor(name: string, commands: ICommandMap) {
    super()
    this.name = `${name}:background`
    this.commands = new Commands(this, commands)
  }

  listenForMessages() {
    chrome.runtime.onMessage.addListener(msg => this.onReceive(msg))
  }

  sendMessage(msg: Message) {
    if (!msg.currentTab) {
      chrome.runtime.sendMessage(msg)
      return
    }

    chrome.tabs.query({ currentWindow: true, active: true }, function(
      tabs: chrome.tabs.Tab[]
    ) {
      if (tabs.length === 0) {
        return
      }

      chrome.tabs.sendMessage(tabs[0].id as number, msg)
    })
  }

  handleIncomingMessage(msg: Message): boolean {
    return this.commands.handleIncomingMessage(msg)
  }
}
