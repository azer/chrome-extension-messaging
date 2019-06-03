import Messaging from "../messaging";
import Message, { IMessageContent } from "../message";
export declare type ICommand = (msg: Message, callback: (error: Error | undefined, result?: IMessageContent) => void) => void;
export declare type ICommandMap = {
    [name: string]: ICommand;
};
export default class Commands {
    client: Messaging;
    map: ICommandMap;
    constructor(client: Messaging, map: ICommandMap);
    get(cmd: string): ICommand | undefined;
    handleIncomingMessage(msg: Message): boolean;
}
