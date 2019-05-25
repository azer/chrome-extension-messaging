import Messaging from "../messaging"
import Message, { IDraftMessage } from "../message"

// A proxy is needed for exchanging messages between web origin and background origin
export default class ContentMessageProxy extends Messaging {
  constructor(name: string) {
    super()
    this.name = `${name}:content-message-proxy`
  }

  listenForMessages() {
    chrome.runtime.onMessage.addListener((msg: Message) => this.onReceive(msg))
    addEventListener("message", event => this.onReceive(event.data))
  }

  onReceive(msg: Message) {
    if (msg.proxyOrigin === this.name) return false
    if (msg.to === this.name) return super.onReceive(msg)

    this.redirectMessage(msg)
    return true
  }

  redirectMessage(msg: Message) {
    msg.proxyOrigin = this.name

    if (msg.to.endsWith(":web")) {
      postMessage(msg, document.location.origin)
      return
    }

    if (msg.to.endsWith(":background")) {
      chrome.runtime.sendMessage(msg)
      return
    }
  }
}
