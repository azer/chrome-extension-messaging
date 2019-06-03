"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
const Commands_1 = require("./Commands");
class ContentClient extends messaging_1.default {
    constructor(name, commands) {
        super();
        this.name = `${name}:content`;
        this.commands = new Commands_1.default(this, commands);
    }
    listenForMessages() {
        chrome.runtime.onMessage.addListener(msg => this.onReceive(msg));
    }
    sendMessage(msg) {
        chrome.runtime.sendMessage(msg);
    }
    handleIncomingMessage(msg) {
        return this.commands.handleIncomingMessage(msg);
    }
}
exports.default = ContentClient;
