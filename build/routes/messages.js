"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MessagesController_1 = __importDefault(require("../controllers/MessagesController"));
var auth_1 = __importDefault(require("../config/auth"));
var router = express_1.Router();
var messagesController = new MessagesController_1.default();
router.get('/', auth_1.default.required, messagesController.getMessages);
router.delete('/:id', auth_1.default.required, messagesController.remove);
exports.default = router;
