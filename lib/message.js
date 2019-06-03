"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let messageCounter = 0;
class Message {
    constructor(options) {
        this.id = options.id;
        this.origin = options.origin;
        this.to = options.to;
        this.content = options.content;
        this.requiresReply = options.requiresReply;
        this.replyTo = options.replyTo;
        this.error = options.error;
        this.currentTab = options.currentTab;
    }
}
exports.default = Message;
function generateMessageId() {
    return String(Date.now() * 1000 + ++messageCounter);
}
exports.generateMessageId = generateMessageId;
