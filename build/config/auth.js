"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secret = process.env.SECRET;
function getTokenFromHeader(req) {
    if (!req.headers.authorization)
        return null;
    var token = req.headers.authorization.split(' ');
    if (token[0] !== 'Chat')
        return null;
    return token[1];
}
var auth = {
    required: express_jwt_1.default({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'payload',
        getToken: getTokenFromHeader,
    }),
    optional: express_jwt_1.default({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader,
    }),
};
exports.default = auth;
