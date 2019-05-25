import Message, { IDraftMessage, IMessage, generateMessageId } from "./message"
import constants from "./constants"

export default class Messaging {
  name: string
  waitingQueue: { [messageId: string]: (response: Message) => void } = {}

  constructor() {
    this.name = "unknown:background"
    this.listenForMessages()
  }

  handleIncomingMessage(msg: Message): boolean {
    return false
  }

  sendMessage(msg: Message) {
    throw new Error("not implemented")
  }

  listenForMessages() {
    throw new Error("not implemented")
  }

  createMessage(draft: IDraftMessage) {
    return new Message({
      id: generateMessageId(),
      origin: this.name,
      to: draft.to,
      error: draft.error,
      content: draft.content,
      replyTo: draft.replyTo
    })
  }

  onReceive(msg: Message): boolean {
    if (msg.to !== this.name) return false

    if (msg.replyTo && this.waitingQueue[msg.replyTo]) {
      this.waitingQueue[msg.replyTo](msg)
      return true
    } else if (msg.replyTo) {
      return false
    }

    if (msg.content["ping"] === true) {
      this.reply(msg, { to: msg.origin, content: { pong: true } })
      return true
    }

    return this.handleIncomingMessage(msg)
  }

  ping(target: string) {
    this.send({
      to: target,
      content: { ping: true },
      requiresReply: true
    })
  }

  reply(original: Message, draft: IDraftMessage) {
    draft.replyTo = original.id
    this.send(draft)
  }

  send(draft: IDraftMessage): Promise<Message> | null {
    const msg = this.createMessage(draft)
    this.sendMessage(msg)

    if (!msg.requiresReply) return null

    return this.waitReplyFor(msg.id, constants.TIMEOUT_SECS)
  }

  waitReplyFor(msgId: string, timeoutSecs: number): Promise<Message> {
    const self = this
    let done: boolean = false

    return new Promise((resolve, reject) => {
      const timer: number = setTimeout(onTimeout, timeoutSecs * 1000)

      this.waitingQueue[msgId] = (msg: Message) => {
        if (done) {
          return
        }

        done = true
        cleanup()
        resolve(msg)
      }

      function cleanup() {
        clearTimeout(timer)
        delete self.waitingQueue[msgId]
      }

      function onTimeout() {
        cleanup()
        resolve(
          new Message({
            id: generateMessageId(),
            origin: "",
            to: self.name,
            content: {},
            error: "Message response timeout (" + timeoutSecs + ")s."
          })
        )
      }
    })
  }
}
