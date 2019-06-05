import Message, { IDraftMessage, IMessageContent } from "./message";
export default class Messaging {
    name: string;
    waitingQueue: {
        [messageId: string]: (response: Message) => void;
    };
    constructor();
    handleIncomingMessage(msg: Message): boolean;
    sendMessage(msg: Message): void;
    listenForMessages(): void;
    createMessage(draft: IDraftMessage): Message;
    onReceive(msg: Message): boolean;
    ping(target: string): void;
    reply(original: Message, draft: IDraftMessage): void;
    send(draft: IDraftMessage, timeoutSecs?: number): Promise<[IMessageContent | null, Error | null]> | null;
    waitReplyFor(msgId: string, timeoutSecs: number): Promise<[IMessageContent | null, Error | null]>;
}
