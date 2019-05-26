let messageCounter: number = 0

export type IMessageContent = {
  [key: string]: object | string | number | boolean | null
}

export interface IDraftMessage {
  to: string
  content: IMessageContent
  requiresReply?: boolean
  replyTo?: string
  error?: string
}

export interface IMessage extends IDraftMessage {
  id: string
  origin: string
}

export default class Message implements IMessage {
  id: string
  origin: string
  to: string
  content: IMessageContent
  requiresReply?: boolean
  replyTo?: string
  error?: string
  proxyOrigin?: string

  constructor(options: IMessage) {
    this.id = options.id
    this.origin = options.origin
    this.to = options.to
    this.content = options.content
    this.requiresReply = options.requiresReply
    this.replyTo = options.replyTo
    this.error = options.error
  }
}

export function generateMessageId(): string {
  return String(Date.now() * 1000 + ++messageCounter)
}
