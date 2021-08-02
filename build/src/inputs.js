"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.exclude_dirs = exports.pythonStyle = exports.cStyle = exports.fileExtensions = void 0;
const core = require("@actions/core");
exports.fileExtensions = core
    .getInput('file-extensions')
    .split(' ');
exports.cStyle = core.getInput('c-style');
exports.pythonStyle = core.getInput('python-style');
exports.exclude_dirs = core
    .getInput('exclude-dirs')
    .split(' ');
exports.token = core.getInput('token');
//# sourceMappingURL=inputs.js.map