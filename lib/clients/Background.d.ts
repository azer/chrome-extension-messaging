import Messaging from "../messaging";
import Message from "../message";
export declare type ICommands = {
    [name: string]: (msg: Message, client: BackgroundClient) => void;
};
export default class BackgroundClient extends Messaging {
    commands: ICommands;
    constructor(name: string);
    defineCommands(commands: ICommands): void;
    handleIncomingMessage(msg: Message): boolean;
}
