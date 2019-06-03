"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Commands {
    constructor(client, map) {
        this.map = map;
        this.client = client;
    }
    get(cmd) {
        return this.map[cmd];
    }
    handleIncomingMessage(msg) {
        const name = msg.content["command"];
        const commandFn = this.get(name);
        if (!commandFn) {
            this.client.reply(msg, {
                to: msg.origin,
                content: {},
                error: `Unrecognized command: ${msg.content["command"]}`
            });
            return false;
        }
        commandFn(msg, (error, result) => {
            if (error) {
                return this.client.reply(msg, {
                    to: msg.origin,
                    content: {},
                    error: error.message
                });
            }
            return this.client.reply(msg, {
                to: msg.origin,
                content: result
            });
        });
        return true;
    }
}
exports.default = Commands;
