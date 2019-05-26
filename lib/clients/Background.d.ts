import Messaging from "../messaging";
import Message, { IMessageContent } from "../message";
export declare type ICommands = {
    [name: string]: (msg: Message, callback: (error: Error | undefined, result?: IMessageContent) => void) => void;
};
export default class BackgroundClient extends Messaging {
    commands: ICommands;
    constructor(name: string, commands: ICommands);
    listenForMessages(): void;
    sendMessage(msg: Message): void;
    handleIncomingMessage(msg: Message): boolean;
}
