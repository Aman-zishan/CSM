#! /usr/bin/env node
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
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const list_interface_1 = __importDefault(require("./core/list-interface"));
const save_snippet_1 = require("./core/save-snippet");
const get_snippets_1 = __importDefault(require("./core/get-snippets"));
const cli_highlight_1 = __importStar(require("cli-highlight"));
const program = new commander_1.Command();
// CSM logo in CLI
console.log(chalk_1.default.red(figlet_1.default.textSync('CSM', '3D Diagonal')));
program
    .version('1.3.0')
    .description(chalk_1.default.green('A CLI Code Snippet Manager tool for managing code snippets directly from your terminal'))
    .option('-s, --save <filepath>', 'Save a code snippet')
    .option('-ls, --list-all', 'List all snippets')
    .option('-o, --output <snippet_title>', 'Output a particular snippet')
    .option('-l, --list', 'Open TUI')
    .parse(process.argv);
const options = program.opts();
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
if (options.save) {
    const filepath = typeof options.save === 'string' ? options.save : '';
    const save_snippet = (0, save_snippet_1.saveSnippet)(filepath);
    console.log(!save_snippet.includes('Error')
        ? chalk_1.default.green(save_snippet)
        : chalk_1.default.red(save_snippet));
}
if (options.list) {
    (0, list_interface_1.default)();
}
if (options.listAll) {
    const snippets = (0, get_snippets_1.default)();
    const titles = snippets.map((snippet) => snippet.title);
    titles.forEach((title) => console.log(chalk_1.default.green(title)));
}
if (options.output) {
    const snippets = (0, get_snippets_1.default)();
    console.log(options.output);
    const title = typeof options.output === 'string'
        ? options.output.split('_').join(' ').trim()
        : '';
    const snippet = snippets.filter((snippet) => snippet.title.toLowerCase().trim() === title.toLowerCase());
    const supportLanguge = (0, cli_highlight_1.supportsLanguage)(snippet[0].language.toLowerCase())
        ? snippet[0].language.toLowerCase()
        : 'txt';
    const highlightedCode = (0, cli_highlight_1.default)(snippet[0].code, {
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
    console.log(highlightedCode);
}
//# sourceMappingURL=index.js.map