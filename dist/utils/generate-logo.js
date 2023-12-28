"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
function generateLogo() {
    // Generate figlet text for both symbols
    const arrow = figlet_1.default.textSync('>', { font: '3D-ASCII' });
    const text = figlet_1.default.textSync('CSM', { font: '3D-ASCII' });
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
        combinedLines.push(chalk_1.default.green(arrowLine) + chalk_1.default.red(textLine));
    }
    // Print each combined line
    combinedLines.forEach((line) => console.log(line));
}
exports.default = generateLogo;
//# sourceMappingURL=generate-logo.js.map