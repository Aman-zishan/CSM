import chalk from 'chalk';
import { Command } from 'commander';
import figlet from 'figlet';
import listSnippets from './core/list-interface';
import { saveSnippet } from './core/save-snippet';

const program = new Command();

console.log(chalk.red(figlet.textSync('CSM', '3D Diagonal')));

program
	.version('1.0.0')
	.description(
		chalk.green(
			'A CLI Code Snippet Manager tool for managing code snippets directly from your terminal currently supports JavaScript, TypeScript and Python',
		),
	)
	.option('-s, --save <snippet-title>.ts | py | js', 'Save a code snippet')
	.option('-l, --list', 'List all code snippets')
	.parse(process.argv);

const options = program.opts();

if (options.save) {
	const filepath = typeof options.save === 'string' ? options.save : '';
	const save_snippet = saveSnippet(filepath);
	console.log(
		!save_snippet.includes('Error')
			? chalk.green(save_snippet)
			: chalk.red(save_snippet),
	);
}

if (options.list) {
	listSnippets();
}
