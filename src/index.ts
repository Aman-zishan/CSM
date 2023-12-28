#! /usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import figlet from 'figlet';
import listSnippets from './core/list-interface';
import { saveSnippet } from './core/save-snippet';

const program = new Command();

// CSM logo in CLI
console.log(chalk.red(figlet.textSync('CSM', '3D Diagonal')));

program
	.version('1.3.0')
	.description(
		chalk.green(
			'A CLI Code Snippet Manager tool for managing code snippets directly from your terminal',
		),
	)
	.option('-s, --save <filepath>', 'Save a code snippet')
	.option('-l, --list', 'Open TUI')
	.parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length) {
	program.outputHelp();
}

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
