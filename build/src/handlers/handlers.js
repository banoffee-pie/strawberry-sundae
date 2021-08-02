"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
class Handlers {
    constructor() {
        this.list = new Map();
    }
    registerHandler(command, handler) {
        this.list.set(command, handler);
    }
    // returns handler for that command if found, undefined otherwise
    selectHandler(command) {
        const handler = this.list.get(command.substring(1).split(' ')[0]);
        if (handler !== undefined)
            return handler;
        return null;
    }
}
exports.handlers = new Handlers();
// Import all the handlers
require("./format");
//# sourceMappingURL=handlers.js.map