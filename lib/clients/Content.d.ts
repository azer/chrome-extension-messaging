import Messaging from "../messaging";
import Message from "../message";
import Commands, { ICommandMap } from "./Commands";
export default class ContentClient extends Messaging {
    commands: Commands;
    constructor(name: string, commands: ICommandMap);
    listenForMessages(): void;
    sendMessage(msg: Message): void;
    handleIncomingMessage(msg: Message): boolean;
}
