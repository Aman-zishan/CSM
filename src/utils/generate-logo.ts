import chalk from 'chalk';
import figlet from 'figlet';

export default function generateLogo() {
	// Generate figlet text for both symbols
	const arrow = figlet.textSync('>', { font: '3D-ASCII' });
	const text = figlet.textSync('CSM', { font: '3D-ASCII' });

	// Split the generated text into lines
	const arrowLines = arrow.split('\n');
	const textLines = text.split('\n');

	// To ensure both pieces have the same number of lines
	const maxLength = Math.max(arrowLines.length, textLines.length);

	// Create a combined text with colored lines
	const combinedLines = [];
	for (let i = 0; i < maxLength; i++) {
		const arrowLine = arrowLines[i] || '';
		const textLine = textLines[i] || '';

		combinedLines.push(chalk.green(arrowLine) + chalk.red(textLine));
	}

	// Print each combined line
	combinedLines.forEach((line) => console.log(line));
}
