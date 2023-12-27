"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSnippet = void 0;
const fs_1 = __importDefault(require("fs"));
const get_snippets_1 = __importStar(require("./get-snippets"));
function deleteSnippet(snippetId) {
    try {
        let snippets = (0, get_snippets_1.default)();
        // Check if the snippet with the given ID exists
        if (!snippets.some((snippet) => snippet.id === snippetId)) {
            return `Error: Snippet with ID ${snippetId} not found.`;
        }
        // Filter out the snippet with the given ID
        snippets = snippets.filter((snippet) => snippet.id !== snippetId);
        // Save the updated snippets back to the file
        fs_1.default.writeFileSync(get_snippets_1.snippetsFilePath, JSON.stringify(snippets, null, 2));
        return `Snippet with ID ${snippetId} deleted successfully.`;
    }
    catch (error) {
        console.log(error);
        return `Error: deleting snippet: ${error.message}`;
    }
}
exports.deleteSnippet = deleteSnippet;
//# sourceMappingURL=delete-snippet.js.map