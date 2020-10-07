"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = exports.usersRouter = void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var messages_1 = require("./messages");
Object.defineProperty(exports, "messagesRouter", { enumerable: true, get: function () { return __importDefault(messages_1).default; } });
