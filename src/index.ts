#! /usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import figlet from 'figlet';
import listSnippets from './core/list-interface';
import { saveSnippet } from './core/save-snippet';
import loadSnippets from './core/get-snippets';
import highlight, { supportsLanguage } from 'cli-highlight';
import generateLogo from './utils/generate-logo';
import listAll from './CLI/list-all';
import { deleteSnippet } from './core/delete-snippet';

const program = new Command();

const version = require('../package.json').version;
generateLogo();
program
	.version(version)
	.description(
		chalk.green(
			'A CLI Code Snippet Manager tool for managing code snippets directly from your terminal',
		),
	)
	.option('-s, --save <filepath>', 'Save a code snippet')
	.option('-ls, --list-all', 'List all snippets')
	.option('-o, --output <snippet_title>', 'Output a particular snippet')
	.option('-d, --delete <snippet_ID>', 'Delete snippet by ID')
	.option('-l, --list', 'Open TUI')
	.addHelpText(
		'after',
		`
Example:
  $ csm-kit -s hello.py
  $ csm-kit -ls
  $ csm-kit -o hello_py
  $ csm-kit -d 1
`,
	)
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

if (options.listAll) {
	listAll();
}

if (options.output) {
	const snippets = loadSnippets();
	console.log(options.output);
	const title =
		typeof options.output === 'string'
			? options.output.split('_').join(' ').trim()
			: '';
	const snippet = snippets.filter(
		(snippet: Snippet) =>
			snippet.title.toLowerCase().trim() === title.toLowerCase(),
	);
	const supportLanguge = supportsLanguage(snippet[0].language.toLowerCase())
		? snippet[0].language.toLowerCase()
		: 'txt';
	const highlightedCode = highlight(snippet[0].code, {
		language: supportLanguge,
		ignoreIllegals: true,
		theme: {
			keyword: chalk.hex('#8F00FF'),
			literal: chalk.magenta,
			function: chalk.blueBright,
			string: chalk.greenBright,
			number: chalk.cyan,
			comment: chalk.green,
			params: chalk.yellow,
		},
	});
	console.log(highlightedCode);
}

if (options.delete) {
	const snippetId =
		typeof options.delete === 'string' ? parseInt(options.delete) : 0;
	console.log(deleteSnippet(snippetId));
}
