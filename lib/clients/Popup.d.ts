import Messaging from "../messaging";
import Message from "../message";
export default class PopupMessagingClient extends Messaging {
    constructor(name: string);
    listenForMessages(): void;
    sendMessage(msg: Message): void;
}
