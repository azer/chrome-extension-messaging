export interface IDraftMessage {
    to: string;
    content: object;
    requiresReply?: boolean;
    replyTo?: string;
    error?: string;
}
export interface IMessage extends IDraftMessage {
    id: string;
    origin: string;
}
export default class Message implements IMessage {
    id: string;
    origin: string;
    to: string;
    content: object;
    requiresReply?: boolean;
    replyTo?: string;
    error?: string;
    proxyOrigin?: string;
    constructor(options: IMessage);
}
export declare function generateMessageId(): string;
