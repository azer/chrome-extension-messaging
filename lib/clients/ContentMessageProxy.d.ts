import Messaging from "../messaging";
import Message from "../message";
export default class ContentMessageProxy extends Messaging {
    constructor(name: string);
    listenForMessages(): void;
    onReceive(msg: Message): boolean;
    redirectMessage(msg: Message): void;
}
