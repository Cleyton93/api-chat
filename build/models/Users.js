"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var crypto_1 = __importDefault(require("crypto"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var secret = process.env.SECRET;
var UsersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'profile-default.png',
    },
}, { timestamps: true });
UsersSchema.methods.setPass = function (pass) {
    this.pass = crypto_1.default.createHash('md5').update(pass).digest('hex');
};
UsersSchema.methods.passValidator = function (pass) {
    if (this.pass === crypto_1.default.createHash('md5').update(pass).digest('hex')) {
        return true;
    }
    return false;
};
UsersSchema.methods.generateToken = function () {
    var exp = new Date();
    exp.setDate(exp.getDate() + 15);
    return jsonwebtoken_1.default.sign({
        id: this._id,
        email: this.email,
        name: this.name,
        avatar: this.avatar,
        exp: exp.getTime() / 1000,
    }, secret);
};
UsersSchema.methods.sendAuthJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        avatar: this.avatar,
        token: this.generateToken(),
    };
};
UsersSchema.plugin(mongoose_unique_validator_1.default, { message: 'Já existe' });
exports.default = mongoose_1.default.model('Users', UsersSchema);
