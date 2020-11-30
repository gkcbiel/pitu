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
const linkRepository_1 = __importDefault(require("../models/linkRepository"));
function generateCode() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function postLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body;
        link.code = generateCode();
        link.hits = 0;
        const result = yield linkRepository_1.default.add(link);
        link.id = result.id;
        if (!result.id)
            return res.sendStatus(400);
        res.status(201).json(link);
    });
}
function getlink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        const link = yield linkRepository_1.default.findByCode(code);
        if (!link) {
            res.sendStatus(404);
        }
        else {
            res.json(link);
        }
    });
}
function hitLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = req.params.code;
        const link = yield linkRepository_1.default.hit(code);
        if (!link) {
            res.sendStatus(404);
        }
        else {
            res.json(link);
        }
    });
}
exports.default = {
    postLink,
    getlink,
    hitLink
};
