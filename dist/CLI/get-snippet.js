"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_snippets_1 = __importDefault(require("../core/get-snippets"));
function getSnippet(title) {
    const snippets = (0, get_snippets_1.default)();
    // Check if the snippet with the given name exists
    if (!snippets.some((snippet) => snippet.title === title)) {
        return `Error: Snippet with name ${name} not found.`;
    }
    // Filter out the snippet with the given name
    const snippet = snippets.filter((snippet) => snippet.title === title);
    return snippet;
}
exports.default = getSnippet;
//# sourceMappingURL=get-snippet.js.map