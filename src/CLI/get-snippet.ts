import loadSnippets from '../core/get-snippets';

export default function getSnippet(title: string) {
	const snippets = loadSnippets();

	// Check if the snippet with the given name exists
	if (!snippets.some((snippet: Snippet) => snippet.title === title)) {
		return `Error: Snippet with name ${name} not found.`;
	}

	// Filter out the snippet with the given name
	const snippet = snippets.filter(
		(snippet: Snippet) => snippet.title === title,
	);

	return snippet;
}
