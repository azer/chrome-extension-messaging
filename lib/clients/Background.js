"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
class BackgroundClient extends messaging_1.default {
    constructor(name) {
        super();
        this.name = `${name}:background`;
        this.commands = {};
    }
    defineCommands(commands) {
        this.commands = {};
        for (let name in commands) {
            this.commands[name] = commands[name];
        }
    }
    handleIncomingMessage(msg) {
        if (this.commands[msg.content["command"]]) {
            this.commands[msg.content["command"]](msg, this);
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
