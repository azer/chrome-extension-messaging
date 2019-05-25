import Messaging from "../messaging";
import Message from "../message";
export default class NewTabMessagingClient extends Messaging {
    constructor(name: string);
    listenForMessages(): void;
    sendMessage(msg: Message): void;
}
