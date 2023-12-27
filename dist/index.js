#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const list_interface_1 = __importDefault(require("./core/list-interface"));
const save_snippet_1 = require("./core/save-snippet");
const program = new commander_1.Command();
console.log(chalk_1.default.red(figlet_1.default.textSync('CSM', '3D Diagonal')));
program
    .version('1.0.0')
    .description(chalk_1.default.green('A CLI Code Snippet Manager tool for managing code snippets directly from your terminal currently supports JavaScript, TypeScript and Python'))
    .option('-s, --save <filepath>', 'Save a code snippet')
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
//# sourceMappingURL=index.js.map