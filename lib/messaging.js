"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("./message");
const constants_1 = require("./constants");
class Messaging {
    constructor() {
        this.waitingQueue = {};
        this.name = "unknown:background";
        this.listenForMessages();
    }
    handleIncomingMessage(msg) {
        return false;
    }
    sendMessage(msg) {
        throw new Error("not implemented");
    }
    listenForMessages() {
        throw new Error("not implemented");
    }
    createMessage(draft) {
        return new message_1.default({
            id: message_1.generateMessageId(),
            origin: this.name,
            to: draft.to,
            error: draft.error,
            content: draft.content,
            replyTo: draft.replyTo,
            requiresReply: draft.requiresReply
        });
    }
    onReceive(msg) {
        if (msg.to !== this.name)
            return false;
        if (msg.replyTo && this.waitingQueue[msg.replyTo]) {
            this.waitingQueue[msg.replyTo](msg);
            return true;
        }
        else if (msg.replyTo) {
            return false;
        }
        if (msg.content["ping"] === true) {
            this.reply(msg, { to: msg.origin, content: { pong: true } });
            return true;
        }
        return this.handleIncomingMessage(msg);
    }
    ping(target) {
        this.send({
            to: target,
            content: { ping: true },
            requiresReply: true
        });
    }
    reply(original, draft) {
        draft.replyTo = original.id;
        this.send(draft);
    }
    send(draft) {
        const msg = this.createMessage(draft);
        this.sendMessage(msg);
        if (!msg.requiresReply)
            return null;
        return this.waitReplyFor(msg.id, constants_1.default.TIMEOUT_SECS);
    }
    waitReplyFor(msgId, timeoutSecs) {
        const self = this;
        let done = false;
        return new Promise((resolve, reject) => {
            const timer = setTimeout(onTimeout, timeoutSecs * 1000);
            this.waitingQueue[msgId] = (msg) => {
                if (done) {
                    return;
                }
                done = true;
                cleanup();
                if (msg.error) {
                    resolve([null, new Error(msg.error)]);
                    return;
                }
                resolve([msg.content, null]);
            };
            function cleanup() {
                clearTimeout(timer);
                delete self.waitingQueue[msgId];
            }
            function onTimeout() {
                cleanup();
                resolve([
                    null,
                    new Error("Message response timeout (" + timeoutSecs + ")s.")
                ]);
            }
        });
    }
}
exports.default = Messaging;
