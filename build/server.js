"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
/* eslint-disable no-console */
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var socket_io_1 = __importDefault(require("socket.io"));
var cors_1 = __importDefault(require("cors"));
var routes = __importStar(require("./routes"));
var Messages_1 = __importDefault(require("./models/Messages"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
var app = express_1.default();
app.use(express_1.default.static('./src/public'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default({ origin: '*' }));
app.use('/usuarios', routes.usersRouter);
app.use('/mensagens', routes.messagesRouter);
// 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(__assign(__assign({}, err), { status: 404 }));
});
// 422, 500, 401...
app.use(function (err, req, res, next) {
    if (err.status !== 404) {
        console.log('Error', err);
    }
    res.status(err.status || 500).json(err);
});
var server = app.listen(process.env.PORT);
var io = socket_io_1.default.listen(server);
io.on('connection', function (socket) {
    console.log('Usuário se conectou');
    socket.on('sendMessage', function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var message, messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = new Messages_1.default({
                        user: String(data.user._id),
                        message: data.message,
                    });
                    return [4 /*yield*/, message.save()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, Messages_1.default.find()
                            .sort({ createdAt: -1 })
                            .limit(30)
                            .populate('user')];
                case 2:
                    messages = _a.sent();
                    messages.reverse();
                    socket.emit('messages', messages);
                    socket.broadcast.emit('messages', messages);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on('removeMessage', function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var message, messages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Messages_1.default.findById(id)];
                case 1:
                    message = _a.sent();
                    message === null || message === void 0 ? void 0 : message.remove();
                    return [4 /*yield*/, Messages_1.default.find()
                            .sort({ createdAt: -1 })
                            .limit(30)
                            .populate('user')];
                case 2:
                    messages = _a.sent();
                    messages.reverse();
                    socket.emit('messages', messages);
                    socket.broadcast.emit('messages', messages);
                    return [2 /*return*/];
            }
        });
    }); });
});
