import loadSnippets from '../core/get-snippets';

export default async function listAll() {
	const snippets = loadSnippets();
	const detailedSnippetsPromises = snippets.map(async (snippet: Snippet) => {
		return {
			ID: snippet.id,
			title: snippet.title,
			language: snippet.language,
		};
	});
	const detailedSnippets = await Promise.all(detailedSnippetsPromises);
	console.table(detailedSnippets);
}
