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

      console.log("active tabs", tabs)

      chrome.tabs.sendMessage(tabs[0].id as number, msg)
    })
  }
}
