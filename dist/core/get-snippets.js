"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snippetsFilePath = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
// Path to the JSON file in the documents directory
exports.snippetsFilePath = path_1.default.join(os_1.default.homedir(), 'Documents', 'csm_snippets_main.json');
// Read the snippets file and parse it into an object
function loadSnippets() {
    try {
        const fileContent = fs_1.default.readFileSync(exports.snippetsFilePath, 'utf8');
        const snippets = JSON.parse(fileContent);
        return snippets;
    }
    catch (error) {
        console.error('Error reading snippets file:', error);
        return [];
    }
}
exports.default = loadSnippets;
//# sourceMappingURL=get-snippets.js.map