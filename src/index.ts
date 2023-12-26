import figlet from 'figlet';
import { Command } from 'commander';
import { saveSnippet } from './core/save-snippet';

const program = new Command();

console.log(figlet.textSync('CSM', 'Standard'));

program
	.version('1.0.0')
	.description('Code Snippet Manger: CLI for managing code snippets')
	.option('-s, --save <snippiet-title>.ts | py | js', 'Save a code snippet')
	.parse(process.argv);

const options = program.opts();

if (options.save) {
	const filepath = typeof options.save === 'string' ? options.save : '';
	saveSnippet(filepath);
}
