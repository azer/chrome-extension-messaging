"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
class PopupMessagingClient extends messaging_1.default {
    constructor(name) {
        super();
        this.name = `${name}:popup`;
    }
    listenForMessages() {
        chrome.runtime.onMessage.addListener((msg) => this.onReceive(msg));
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
            console.log("active tabs", tabs);
            chrome.tabs.sendMessage(tabs[0].id, msg);
        });
    }
}
exports.default = PopupMessagingClient;
