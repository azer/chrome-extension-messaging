"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messaging_1 = require("../messaging");
// A proxy is needed for exchanging messages between web origin and background origin
class ContentMessageProxy extends messaging_1.default {
    constructor(name) {
        super();
        this.name = `${name}:content-message-proxy`;
    }
    listenForMessages() {
        chrome.runtime.onMessage.addListener((msg) => this.onReceive(msg));
        addEventListener("message", event => this.onReceive(event.data));
    }
    onReceive(msg) {
        if (msg.proxyOrigin === this.name)
            return false;
        if (msg.to === this.name)
            return super.onReceive(msg);
        this.redirectMessage(msg);
        return true;
    }
    redirectMessage(msg) {
        msg.proxyOrigin = this.name;
        if (msg.to.endsWith(":web")) {
            postMessage(msg, document.location.origin);
            return;
        }
        if (msg.to.endsWith(":background")) {
            chrome.runtime.sendMessage(msg);
            return;
        }
    }
}
exports.default = ContentMessageProxy;
