import * as blessed from 'neo-blessed';
import loadSnippets from './get-snippets';
import highlight from 'cli-highlight';
import chalk from 'chalk';

// Call to load the snippets.
export default function listSnippets() {
	// Create a screen object.
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
		height: '90%',
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
	const editor = blessed.textarea({
		parent: screen,
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
		mouse: true,
		keys: true,
		inputOnFocus: true,
	});

	// Append our box to the screen.

	screen.append(titleBar);
	screen.append(EditorTitleBar);
	screen.append(list);
	screen.append(editor);
	screen.append(footer);

	// Focus on the snippet list to allow for navigation.
	list.focus();

	// Add key event for quitting the program.
	screen.key(['escape', 'q', 'C-c'], function (ch, key) {
		return process.exit(0);
	});

	// Load the snippets into the list.

	const snippets = loadSnippets();
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
			chalk.hex('#36454F')('select snippet') +
			'\t ' +
			chalk.hex('#36454F').bold('c') +
			' ' +
			chalk.hex('#36454F')('copy current code snippet') +
			'\t ' +
			chalk.hex('#36454F').bold('↑↓') +
			' ' +
			chalk.hex('#36454F')('move up/down the list'),
	);
	screen.render();

	// Handling list selection
	list.on('select', function (data) {
		const selectedTitle = data.content;
		const selectedSnippet = snippets.find(
			(snippet: Snippet) => snippet.title === selectedTitle,
		);
		if (selectedSnippet) {
			const highlightedCode = highlight(selectedSnippet.code, {
				language: selectedSnippet.language.toLowerCase(),
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

			editor.setValue(highlightedCode);
			editor.screen.render();

			screen.key(['c'], async function (ch, key) {
				const clipboardy = (await import('clipboardy')).default;
				clipboardy.writeSync(selectedSnippet.code);
				editor.setValue(chalk.green('Copied to clipboard!'));
				editor.screen.render();
			});
		}
	});
}
