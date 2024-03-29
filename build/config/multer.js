"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
var upload = multer_1.default({ storage: storage });
exports.default = upload;
