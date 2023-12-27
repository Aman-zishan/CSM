import loadSnippets from './get-snippets';
import highlight from 'cli-highlight';
import { supportsLanguage } from 'cli-highlight';
import chalk from 'chalk';

import * as blessed from 'neo-blessed';
import { deleteSnippet } from './delete-snippet';

// Call to load the snippets.
export default function listSnippets() {
	let snippets: Snippet[] = loadSnippets();
	let selectedSnippet: Snippet | undefined;
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

	const titles = snippets.map((snippet: Snippet) => snippet.title);
	list.setItems(titles);
	titleBar.setValue(chalk.hex('#36454F').bold('Snippets'));
	EditorTitleBar.setValue(chalk.hex('#36454F').bold('Snippet Code Viewer'));
	footer.setValue(
		chalk.hex('#36454F').bold('q') +
			' ' +
			chalk.hex('#36454F')('quit') +
			'\t' +
			chalk.hex('#36454F').bold('⏎') +
			' ' +
			chalk.hex('#36454F')('select') +
			'\t ' +
			chalk.hex('#36454F').bold('c') +
			' ' +
			chalk.hex('#36454F')('copy') +
			'\t ' +
			chalk.hex('#36454F').bold('d') +
			' ' +
			chalk.hex('#36454F')('delete') +
			'\t ' +
			chalk.hex('#36454F').bold('↑↓') +
			' ' +
			chalk.hex('#36454F')('move up/down the list') +
			'\t ' +
			chalk.hex('#36454F').bold('/') +
			' ' +
			chalk.hex('#36454F')('search') +
			'\t ' +
			chalk.hex('#36454F').bold('tab') +
			' ' +
			chalk.hex('#36454F')('focus editor'),
	);

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
	screen.key(['d', 'delete'], async function (ch, key) {
		if (!selectedSnippet) return;
		const delete_snippet = deleteSnippet(selectedSnippet.id);
		snippets = loadSnippets();
		list.setItems(snippets.map((snippet: Snippet) => snippet.title));
		editor.setContent(
			!delete_snippet.includes('Error')
				? chalk.green(delete_snippet)
				: chalk.red(delete_snippet),
		);
		editor.screen.render();
	});

	// clear search
	screen.key(['escape'], async function (ch, key) {
		snippets = loadSnippets();
		list.setItems(snippets.map((snippet: Snippet) => snippet.title));
		searchBox.setValue('');
		list.screen.render();
	});

	// handling copy to clipboard
	screen.key(['c'], async function (ch, key) {
		const clipboardy = (await import('clipboardy')).default;
		if (!selectedSnippet) return;
		clipboardy.writeSync(selectedSnippet.code);
		editor.setContent(chalk.green('Copied to clipboard!'));
		editor.screen.render();
	});

	screen.key(['/', 's'], function (ch, key) {
		// implement search functionality

		searchBox.focus();

		searchBox.on('keypress', function (ch, key) {
			if (key.name === 'enter') {
				const searchResults = snippets.filter((snippet: Snippet) =>
					snippet.title
						.toLowerCase()
						.includes(searchBox.getValue().toLowerCase()),
				);
				list.setItems(
					searchResults.map((snippet: Snippet) => snippet.title),
				);
				list.screen.render();
			}
		});
	});

	// Handling list selection
	list.on('select', function (data) {
		selectedSnippet = snippets.find(
			(snippet: Snippet) => snippet.title === data.content,
		);
		if (selectedSnippet) {
			const supportLanguge = supportsLanguage(
				selectedSnippet.language.toLowerCase(),
			)
				? selectedSnippet.language.toLowerCase()
				: 'txt';
			const highlightedCode = highlight(selectedSnippet.code, {
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

			editor.setContent(highlightedCode);
			editor.screen.render();
		}
	});
}
