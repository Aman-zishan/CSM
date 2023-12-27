"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSnippet = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// function getLanguageFromExtension(filePath: string): string {
// 	const extension = path.extname(filePath).toLowerCase();
// 	const languageMap: { [key: string]: string } = {
// 		'.js': 'JavaScript',
// 		'.ts': 'TypeScript',
// 		'.py': 'Python',
// 		// Add more mappings as needed
// 	};
// 	return languageMap[extension] || 'Unknown';
// }
function saveSnippet(filePath) {
    try {
        let title = path_1.default.basename(filePath, path_1.default.extname(filePath)); // Extract the filename without extension
        const language = path_1.default.extname(filePath).toLowerCase().substring(1);
        const code = fs_1.default.readFileSync(filePath, 'utf8');
        if (title.includes('_')) {
            title = title.split('_').join(' ');
        }
        const snippetsFilePath = path_1.default.join(process.env.HOME || process.env.USERPROFILE, 'Documents', 'csm_snippets_main.json');
        let snippets = [];
        if (fs_1.default.existsSync(snippetsFilePath)) {
            snippets = JSON.parse(fs_1.default.readFileSync(snippetsFilePath, 'utf8'));
        }
        // Generate an ID - this will be the highest ID in the list plus one, or 1 if the list is empty
        const nextId = snippets.length > 0
            ? Math.max(...snippets.map((s) => s.id)) + 1
            : 1;
        const snippet = { id: nextId, language, code, title };
        snippets.push(snippet);
        fs_1.default.writeFileSync(snippetsFilePath, JSON.stringify(snippets, null, 2));
        return `Code Snippet saved successfully with ID: ${nextId}`;
    }
    catch (error) {
        console.log(error);
        return `Error saving snippet: ${error.message}`;
    }
}
exports.saveSnippet = saveSnippet;
//# sourceMappingURL=save-snippet.js.map