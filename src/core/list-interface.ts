import * as blessed from 'neo-blessed';
import loadSnippets from './get-snippets';

// Call to load the snippets.
export default function listSnippets() {
	// Create a screen object.
	const screen = blessed.screen({
		smartCSR: true,
		title: 'Code Snippet Manager',
	});

	// Create a box for the left panel (snippet list).
	const list = blessed.list({
		parent: screen,
		width: '30%',
		height: '100%',
		left: '0',
		top: '0',
		align: 'left',
		fg: 'blue',
		border: {
			type: 'line',
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
		height: '100%',
		left: '30%',
		top: '0',
		align: 'left',
		fg: 'white',
		border: {
			type: 'line',
		},
		mouse: true,
		keys: true,
		inputOnFocus: true,
	});

	// Append our box to the screen.
	screen.append(list);
	screen.append(editor);

	// Focus on the snippet list to allow for navigation.
	list.focus();

	// Add key event for quitting the program.
	screen.key(['escape', 'q', 'C-c'], function (ch, key) {
		return process.exit(0);
	});

	// Render the screen.
	screen.render();

	// Load the snippets into the list.

	const snippets = loadSnippets();
	const titles = snippets.map((snippet: Snippet) => snippet.title);
	list.setItems(titles);
	screen.render();

	// Handling list selection
	list.on('select', function (data) {
		const selectedTitle = data.content;
		const selectedSnippet = snippets.find(
			(snippet: Snippet) => snippet.title === selectedTitle,
		);
		if (selectedSnippet) {
			editor.setValue(selectedSnippet.code);
			editor.screen.render();
		}
	});
}
