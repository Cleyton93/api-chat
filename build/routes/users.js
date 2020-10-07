"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var auth_1 = __importDefault(require("../config/auth"));
var multer_1 = __importDefault(require("../config/multer"));
var router = express_1.Router();
var usersController = new UsersController_1.default();
router.post('/register', multer_1.default.single('avatar'), usersController.add);
router.put('/', auth_1.default.required, multer_1.default.single('avatar'), usersController.update);
router.get('/', auth_1.default.required, usersController.getUser);
router.post('/login', usersController.login);
exports.default = router;
