import fs from 'fs';
import os from 'os';
import path from 'path';

// Path to the JSON file in the documents directory
const snippetsFilePath = path.join(
	os.homedir(),
	'Documents',
	'csm_snippets_main.json',
);

// Read the snippets file and parse it into an object
export default function loadSnippets() {
	try {
		const fileContent = fs.readFileSync(snippetsFilePath, 'utf8');
		const snippets = JSON.parse(fileContent);
		return snippets;
	} catch (error) {
		console.error('Error reading snippets file:', error);
		return [];
	}
}
