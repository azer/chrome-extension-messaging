"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
class BackgroundClient extends messaging_1.default {
    constructor(name, commands) {
        super();
        this.name = `${name}:background`;
        this.commands = commands;
    }
    listenForMessages() {
        chrome.runtime.onMessage.addListener(msg => this.onReceive(msg));
    }
    sendMessage(msg) {
        chrome.runtime.sendMessage(msg);
    }
    handleIncomingMessage(msg) {
        const cmd = msg.content["command"];
        if (this.commands[cmd]) {
            this.commands[cmd](msg, (error, result) => {
                if (error) {
                    return this.reply(msg, {
                        to: msg.origin,
                        content: {},
                        error: error.message
                    });
                }
                return this.reply(msg, {
                    to: msg.origin,
                    content: result
                });
            });
            return true;
        }
        this.reply(msg, {
            to: msg.origin,
            content: {},
            error: `Unrecognized command: ${msg.content["command"]}`
        });
        return false;
    }
}
exports.default = BackgroundClient;
