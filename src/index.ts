import figlet from 'figlet';
import { Command } from 'commander';
import { saveSnippet } from './core/save-snippet';
import listSnippets from './core/list-interface';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import chalk from 'chalk';

hljs.registerLanguage('javascript', javascript);

//@ts-ignore
hljs.registerLanguage('python', python);

const program = new Command();

console.log(chalk.red(figlet.textSync('CSM', '3D Diagonal')));

program
	.version('1.0.0')
	.description(
		chalk.green('Code Snippet Manger: CLI for managing code snippets'),
	)
	.option('-s, --save <snippet-title>.ts | py | js', 'Save a code snippet')
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
