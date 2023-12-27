import fs from 'fs';
import path from 'path';
import os from 'os';
import loadSnippets, { snippetsFilePath } from './get-snippets';

function deleteSnippet(snippetId: number): string {
	try {
		let snippets: Snippet[] = loadSnippets();

		// Check if the snippet with the given ID exists
		if (!snippets.some((snippet: Snippet) => snippet.id === snippetId)) {
			return `Error: Snippet with ID ${snippetId} not found.`;
		}

		// Filter out the snippet with the given ID
		snippets = snippets.filter((snippet) => snippet.id !== snippetId);

		// Save the updated snippets back to the file
		fs.writeFileSync(snippetsFilePath, JSON.stringify(snippets, null, 2));

		return `Snippet with ID ${snippetId} deleted successfully.`;
	} catch (error: any) {
		console.log(error);
		return `Error: deleting snippet: ${error.message}`;
	}
}

export { deleteSnippet };
