import Messaging from "../messaging"
import Message from "../message"

export default class PopupMessagingClient extends Messaging {
  constructor(name: string) {
    super()
    this.name = `${name}:popup`
  }

  listenForMessages() {
    chrome.runtime.onMessage.addListener((msg: Message) => this.onReceive(msg))
  }

  sendMessage(msg: Message) {
    chrome.runtime.sendMessage(msg)
  }
}
