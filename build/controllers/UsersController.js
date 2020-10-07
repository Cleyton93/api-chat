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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Users_1 = __importDefault(require("../models/Users"));
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    // POST /register
    UsersController.prototype.add = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, name, email, pass, avatar, user, _c, _d, err_1;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = req.body, name = _b.name, email = _b.email, pass = _b.pass;
                        avatar = 'profile-default.png';
                        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) {
                            avatar = req.file.filename;
                        }
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 5, , 6]);
                        user = new Users_1.default({ name: name, email: email, pass: pass, avatar: avatar });
                        return [4 /*yield*/, user.setPass(pass)];
                    case 2:
                        _f.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _f.sent();
                        _d = (_c = res).json;
                        _e = {};
                        return [4 /*yield*/, user.sendAuthJSON()];
                    case 4: return [2 /*return*/, _d.apply(_c, [(_e.user = _f.sent(), _e)])];
                    case 5:
                        err_1 = _f.sent();
                        return [2 /*return*/, next(err_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // PUT
    UsersController.prototype.update = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, _b, name, email, pass, user, _c, _d, err_2;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        id = req.payload.id;
                        _b = req.body, name = _b.name, email = _b.email, pass = _b.pass;
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, Users_1.default.findById(id)];
                    case 2:
                        user = _f.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).json('Usuário não encontrado.')];
                        if (name)
                            user.name = name;
                        if (email)
                            user.email = email;
                        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename)
                            user.avatar = req.file.filename;
                        if (!pass) return [3 /*break*/, 4];
                        return [4 /*yield*/, user.setPass(pass)];
                    case 3:
                        _f.sent();
                        _f.label = 4;
                    case 4: return [4 /*yield*/, user.save()];
                    case 5:
                        _f.sent();
                        _d = (_c = res).json;
                        _e = {};
                        return [4 /*yield*/, user.sendAuthJSON()];
                    case 6: return [2 /*return*/, _d.apply(_c, [(_e.user = _f.sent(), _e)])];
                    case 7:
                        err_2 = _f.sent();
                        return [2 /*return*/, next(err_2)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // GET
    UsersController.prototype.getUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.payload.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Users_1.default.findById(id)];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não registrado.' })];
                        return [2 /*return*/, res.json({ user: user.sendAuthJSON() })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, next(err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // POST /login
    UsersController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, pass, user, _b, _c, err_4;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = req.body, email = _a.email, pass = _a.pass;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, Users_1.default.findOne({ email: email })];
                    case 2:
                        user = _e.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).json({ error: 'Usuário não encontrado.' })];
                        return [4 /*yield*/, user.passValidator(pass)];
                    case 3:
                        if (!(_e.sent())) {
                            return [2 /*return*/, res.status(401).json({ error: 'Senha inválida' })];
                        }
                        _c = (_b = res).json;
                        _d = {};
                        return [4 /*yield*/, user.sendAuthJSON()];
                    case 4: return [2 /*return*/, _c.apply(_b, [(_d.user = _e.sent(), _d)])];
                    case 5:
                        err_4 = _e.sent();
                        return [2 /*return*/, next(err_4)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
