"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.footer = exports.EditorTitleBar = exports.titleBar = exports.editor = exports.list = exports.screen = void 0;
const blessed = __importStar(require("neo-blessed"));
// Create a screen object.
const screen = blessed.screen({
    smartCSR: true,
    title: 'Code Snippet Manager',
});
exports.screen = screen;
const titleBar = blessed.textarea({
    bg: '#D3D3D3',
    parent: screen,
    top: 0,
    left: 0,
    width: '20%',
    height: '10%',
    padding: {
        left: 1,
    },
});
exports.titleBar = titleBar;
const EditorTitleBar = blessed.textarea({
    bg: '#D3D3D3',
    parent: screen,
    top: 0,
    left: '30%',
    width: '30%',
    height: '10%',
    padding: {
        left: 1,
    },
});
exports.EditorTitleBar = EditorTitleBar;
const footer = blessed.textarea({
    parent: screen,
    fg: '#36454F',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '5%',
    padding: {
        left: 1,
    },
});
exports.footer = footer;
// Create a box for the left panel (snippet list).
const list = blessed.list({
    parent: screen,
    width: '30%',
    height: '90%',
    left: '0',
    top: '5%',
    align: 'left',
    fg: '#36454F',
    padding: {
        left: 1,
        top: 2,
    },
    keys: true,
    mouse: true,
    scrollable: true,
    items: [], // This will be dynamically filled with snippet names
});
exports.list = list;
// Create a box for the right panel (code editor).
const editor = blessed.textarea({
    parent: screen,
    width: '70%',
    height: '90%',
    left: '30%',
    top: '5%',
    align: 'left',
    fg: 'white',
    padding: {
        left: 1,
        top: 2,
    },
    mouse: true,
    keys: true,
    inputOnFocus: true,
});
exports.editor = editor;
//# sourceMappingURL=blessed-components.js.map