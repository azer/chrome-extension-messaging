export declare type IMessageContent = {
    [key: string]: object | string | number | boolean | null;
};
export interface IDraftMessage {
    to: string;
    content: IMessageContent;
    requiresReply?: boolean;
    currentTab?: boolean;
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
    content: IMessageContent;
    requiresReply?: boolean;
    replyTo?: string;
    error?: string;
    proxyOrigin?: string;
    currentTab?: boolean;
    constructor(options: IMessage);
}
export declare function generateMessageId(): string;
