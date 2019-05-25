"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
class NewTabMessagingClient extends messaging_1.default {
    constructor(name) {
        super();
        this.name = `${name}:newtab`;
    }
    listenForMessages() {
        chrome.runtime.onMessage.addListener((msg) => this.onReceive(msg));
    }
    sendMessage(msg) {
        chrome.runtime.sendMessage(msg);
    }
}
exports.default = NewTabMessagingClient;
