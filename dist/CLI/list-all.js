"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_snippets_1 = __importDefault(require("../core/get-snippets"));
function listAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const snippets = (0, get_snippets_1.default)();
        const detailedSnippetsPromises = snippets.map((snippet) => __awaiter(this, void 0, void 0, function* () {
            return {
                ID: snippet.id,
                title: snippet.title,
                language: snippet.language,
            };
        }));
        const detailedSnippets = yield Promise.all(detailedSnippetsPromises);
        console.table(detailedSnippets);
    });
}
exports.default = listAll;
//# sourceMappingURL=list-all.js.map