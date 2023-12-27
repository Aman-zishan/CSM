import fs from 'fs';
import path from 'path';

interface Snippet {
	id: number;
	language: string;
	code: string;
	title: string;
}

// function getLanguageFromExtension(filePath: string): string {
// 	const extension = path.extname(filePath).toLowerCase();
// 	const languageMap: { [key: string]: string } = {
// 		'.js': 'JavaScript',
// 		'.ts': 'TypeScript',
// 		'.py': 'Python',
// 		// Add more mappings as needed
// 	};
// 	return languageMap[extension] || 'Unknown';
// }

function saveSnippet(filePath: string): string {
	try {
		let title = path.basename(filePath, path.extname(filePath)); // Extract the filename without extension
		const language = path.extname(filePath).toLowerCase().substring(1);
		const code = fs.readFileSync(filePath, 'utf8');

		if (title.includes('_')) {
			title = title.split('_').join(' ');
		}

		const snippetsFilePath = path.join(
			process.env.HOME || process.env.USERPROFILE!,
			'Documents',
			'csm_snippets_main.json',
		);
		let snippets: Snippet[] = [];

		if (fs.existsSync(snippetsFilePath)) {
			snippets = JSON.parse(fs.readFileSync(snippetsFilePath, 'utf8'));
		}

		// Generate an ID - this will be the highest ID in the list plus one, or 1 if the list is empty
		const nextId =
			snippets.length > 0
				? Math.max(...snippets.map((s) => s.id)) + 1
				: 1;

		const snippet: Snippet = { id: nextId, language, code, title };
		snippets.push(snippet);
		fs.writeFileSync(snippetsFilePath, JSON.stringify(snippets, null, 2));

		return `Code Snippet saved successfully with ID: ${nextId}`;
	} catch (error: any) {
		console.log(error);
		return `Error saving snippet: ${error.message}`;
	}
}

export { saveSnippet };
