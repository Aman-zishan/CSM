import figlet from 'figlet';
import { Command } from 'commander';
import { saveSnippet } from './core/save-snippet';
import listSnippets from './core/list-interface';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('javascript', javascript);

//@ts-ignore
hljs.registerLanguage('python', python);

const program = new Command();

console.log(figlet.textSync('CSM', 'Standard'));

program
	.version('1.0.0')
	.description('Code Snippet Manger: CLI for managing code snippets')
	.option('-s, --save <snippiet-title>.ts | py | js', 'Save a code snippet')
	.option('-l, --list', 'List all code snippets')
	.parse(process.argv);

const options = program.opts();

if (options.save) {
	const filepath = typeof options.save === 'string' ? options.save : '';
	saveSnippet(filepath);
}

if (options.list) {
	listSnippets();
}
