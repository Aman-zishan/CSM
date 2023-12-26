import fs from 'fs';
import path from 'path';

interface Snippet {
	language: string;
	code: string;
	title: string;
}

function getLanguageFromExtension(filePath: string): string {
	const extension = path.extname(filePath).toLowerCase();
	const languageMap: { [key: string]: string } = {
		'.js': 'JavaScript',
		'.ts': 'TypeScript',
		'.py': 'Python',
		// Add more mappings as needed
	};
	return languageMap[extension] || 'Unknown';
}

function saveSnippet(filePath: string): string {
	try {
		console.log('saving snippet...');
		const title = path.basename(filePath, path.extname(filePath)); // Extract the filename without extension
		console.log('saving snippet...', title);
		const language = getLanguageFromExtension(filePath);
		const code = fs.readFileSync(filePath, 'utf8');
		const snippet: Snippet = { language, code, title };

		const snippetsFilePath = path.join(
			process.env.HOME || process.env.USERPROFILE!,
			'Documents',
			'csm_snippets_main.json',
		);
		let snippets: Snippet[] = [];

		if (fs.existsSync(snippetsFilePath)) {
			snippets = JSON.parse(fs.readFileSync(snippetsFilePath, 'utf8'));
		}

		snippets.push(snippet);
		fs.writeFileSync(snippetsFilePath, JSON.stringify(snippets, null, 2));
		console.log('done');
		return `Code Snippet saved successfully: ${title}`;
	} catch (error: any) {
		console.log(error);
		return `Error saving snippet: ${error.message}`;
	}
}

export { saveSnippet };
