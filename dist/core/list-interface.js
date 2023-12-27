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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_snippets_1 = __importDefault(require("./get-snippets"));
const cli_highlight_1 = __importDefault(require("cli-highlight"));
const cli_highlight_2 = require("cli-highlight");
const chalk_1 = __importDefault(require("chalk"));
const blessed = __importStar(require("neo-blessed"));
const delete_snippet_1 = require("./delete-snippet");
// Call to load the snippets.
function listSnippets() {
    let snippets = (0, get_snippets_1.default)();
    let selectedSnippet;
    const screen = blessed.screen({
        smartCSR: true,
        title: 'Code Snippet Manager',
    });
    const titleBar = blessed.textarea({
        bg: '#D3D3D3',
        parent: screen,
        top: 0,
        left: 0,
        width: '20%',
        height: '10%',
        padding: {
            left: 1,
        },
    });
    const EditorTitleBar = blessed.textarea({
        bg: '#D3D3D3',
        parent: screen,
        top: 0,
        left: '30%',
        width: '30%',
        height: '10%',
        padding: {
            left: 1,
        },
    });
    const footer = blessed.textarea({
        parent: screen,
        fg: '#36454F',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '5%',
        padding: {
            left: 1,
        },
    });
    // Create a box for the left panel (snippet list).
    const list = blessed.list({
        parent: screen,
        width: '30%',
        height: '80%',
        left: '0',
        top: '5%',
        align: 'left',
        fg: '#36454F',
        padding: {
            left: 1,
            top: 2,
        },
        keys: true,
        mouse: true,
        scrollable: true,
        items: [], // This will be dynamically filled with snippet names
    });
    // Create a box for the right panel (code editor).
    const editor = blessed.box({
        width: '70%',
        height: '90%',
        left: '30%',
        top: '5%',
        align: 'left',
        fg: 'white',
        padding: {
            left: 1,
            top: 2,
        },
        overflow: 'auto',
        mouse: true,
        scrollable: true,
    });
    // Append our boxes to the screen.
    screen.append(titleBar);
    screen.append(EditorTitleBar);
    screen.append(list);
    screen.append(editor);
    screen.append(footer);
    // Focus on the snippet list to allow for navigation.
    list.focus();
    // Handle quit
    screen.key(['q', 'C-c'], function (ch, key) {
        return process.exit(0);
    });
    screen.key(['tab'], function (ch, key) {
        editor.focus();
    });
    const titles = snippets.map((snippet) => snippet.title);
    list.setItems(titles);
    titleBar.setValue(chalk_1.default.hex('#36454F').bold('Snippets'));
    EditorTitleBar.setValue(chalk_1.default.hex('#36454F').bold('Snippet Code Viewer'));
    footer.setValue(chalk_1.default.hex('#36454F').bold('q') +
        ' ' +
        chalk_1.default.hex('#36454F')('quit') +
        '\t' +
        chalk_1.default.hex('#36454F').bold('⏎') +
        ' ' +
        chalk_1.default.hex('#36454F')('select') +
        '\t ' +
        chalk_1.default.hex('#36454F').bold('c') +
        ' ' +
        chalk_1.default.hex('#36454F')('copy') +
        '\t ' +
        chalk_1.default.hex('#36454F').bold('d') +
        ' ' +
        chalk_1.default.hex('#36454F')('delete') +
        '\t ' +
        chalk_1.default.hex('#36454F').bold('↑↓') +
        ' ' +
        chalk_1.default.hex('#36454F')('move up/down the list') +
        '\t ' +
        chalk_1.default.hex('#36454F').bold('/') +
        ' ' +
        chalk_1.default.hex('#36454F')('search') +
        '\t ' +
        chalk_1.default.hex('#36454F').bold('esc') +
        ' ' +
        chalk_1.default.hex('#36454F')('go back'));
    screen.render();
    const searchBox = blessed.textarea({
        parent: screen,
        fg: 'white',
        bottom: 2,
        left: 0,
        width: '30%',
        height: '10%',
        padding: {
            left: 1,
        },
        mouse: true,
        keys: true,
        inputOnFocus: true,
    });
    // handling delete
    screen.key(['d', 'delete'], function (ch, key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!selectedSnippet)
                return;
            const delete_snippet = (0, delete_snippet_1.deleteSnippet)(selectedSnippet.id);
            snippets = (0, get_snippets_1.default)();
            list.setItems(snippets.map((snippet) => snippet.title));
            editor.setContent(!delete_snippet.includes('Error')
                ? chalk_1.default.green(delete_snippet)
                : chalk_1.default.red(delete_snippet));
            editor.screen.render();
        });
    });
    // clear search
    screen.key(['escape'], function (ch, key) {
        return __awaiter(this, void 0, void 0, function* () {
            snippets = (0, get_snippets_1.default)();
            list.setItems(snippets.map((snippet) => snippet.title));
            searchBox.setValue('');
            list.screen.render();
        });
    });
    // handling copy to clipboard
    screen.key(['c'], function (ch, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const clipboardy = (yield import('clipboardy')).default;
            if (!selectedSnippet)
                return;
            clipboardy.writeSync(selectedSnippet.code);
            editor.setContent(chalk_1.default.green('Copied to clipboard!'));
            editor.screen.render();
        });
    });
    screen.key(['/', 's'], function (ch, key) {
        // implement search functionality
        searchBox.focus();
        searchBox.on('keypress', function (ch, key) {
            if (key.name === 'enter') {
                const searchResults = snippets.filter((snippet) => snippet.title
                    .toLowerCase()
                    .includes(searchBox.getValue().toLowerCase()));
                list.setItems(searchResults.map((snippet) => snippet.title));
                list.screen.render();
            }
        });
    });
    // Handling list selection
    list.on('select', function (data) {
        selectedSnippet = snippets.find((snippet) => snippet.title === data.content);
        if (selectedSnippet) {
            const supportLanguge = (0, cli_highlight_2.supportsLanguage)(selectedSnippet.language.toLowerCase())
                ? selectedSnippet.language.toLowerCase()
                : 'txt';
            const highlightedCode = (0, cli_highlight_1.default)(selectedSnippet.code, {
                language: supportLanguge,
                ignoreIllegals: true,
                theme: {
                    keyword: chalk_1.default.hex('#8F00FF'),
                    literal: chalk_1.default.magenta,
                    function: chalk_1.default.blueBright,
                    string: chalk_1.default.greenBright,
                    number: chalk_1.default.cyan,
                    comment: chalk_1.default.green,
                    params: chalk_1.default.yellow,
                },
            });
            editor.setContent(highlightedCode);
            editor.screen.render();
        }
    });
}
exports.default = listSnippets;
//# sourceMappingURL=list-interface.js.map