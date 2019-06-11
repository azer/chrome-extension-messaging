"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
const Commands_1 = require("./Commands");
class BackgroundClient extends messaging_1.default {
    constructor(name, commands) {
        super();
        this.name = `${name}:background`;
        this.commands = new Commands_1.default(this, commands);
    }
    listenForMessages() {
        chrome.runtime.onMessage.addListener(msg => this.onReceive(msg));
    }
    sendMessage(msg) {
        if (!msg.currentTab) {
            chrome.runtime.sendMessage(msg);
            return;
        }
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            if (tabs.length === 0) {
                return;
            }
            chrome.tabs.sendMessage(tabs[0].id, msg);
        });
    }
    handleIncomingMessage(msg) {
        return this.commands.handleIncomingMessage(msg);
    }
}
exports.default = BackgroundClient;
