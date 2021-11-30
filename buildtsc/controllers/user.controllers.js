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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getCurrentUserProducts = exports.updateMe = exports.getMe = exports.getUserById = exports.logoutUser = exports.loginUser = exports.createUser = exports.getUser = void 0;
var User = require('../models/User');
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.find({})];
            case 1:
                users = _a.sent();
                res.status(200).send(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = new User(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user.generateAuthToken()];
            case 2:
                token = _a.sent();
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.status(201).cookie('jwt', token, { httpOnly: true }).cookie('isLogged', true).send({ id: user._id, name: user.name });
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                res.status(400).send(e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User.findByCredentials(req.body.email, req.body.password)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.generateAuthToken()];
            case 2:
                token = _a.sent();
                res.status(200).cookie('jwt', token, { httpOnly: true }).cookie('isLogged', true).send({ id: user._id, name: user.name, email: user.email });
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.status(500).send(e_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var logoutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                req.user.tokens = req.user.tokens.filter(function (token) {
                    return token.token !== req.token;
                });
                return [4 /*yield*/, req.user.save()];
            case 2:
                _a.sent();
                res.status(200).clearCookie('isLogged').clearCookie('jwt').send();
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(500).send(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logoutUser = logoutUser;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findById(_id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    throw new Error();
                }
                res.status(200).send(user);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(500).send(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var getMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.status(200).send(req.user);
        }
        catch (e) {
            res.status(500).send(e);
        }
        return [2 /*return*/];
    });
}); };
exports.getMe = getMe;
var updateMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updates, allowedUpdates, isValidOperation, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updates = Object.keys(req.body);
                allowedUpdates = ['firstName', 'lastName', 'email'];
                isValidOperation = updates.every(function (update) { return allowedUpdates.includes(update); });
                if (!isValidOperation) {
                    return [2 /*return*/, res.status(400).send({ error: 'Invalid updates!' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                updates.forEach(function (update) {
                    req.user[update] = req.body[update];
                });
                return [4 /*yield*/, req.user.save()];
            case 2:
                _a.sent();
                res.status(200).send(req.user);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                console.log(e_6);
                res.status(400).send(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateMe = updateMe;
var getCurrentUserProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, req.user.populate('products')];
            case 1:
                _a.sent();
                res.send(req.user.products);
                return [3 /*break*/, 3];
            case 2:
                e_7 = _a.sent();
                res.status(500).send(e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentUserProducts = getCurrentUserProducts;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, updates, allowedUpdates, isValidOperation, user_1, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                updates = Object.keys(req.body);
                allowedUpdates = ['firstName', 'lastName', 'password'];
                isValidOperation = updates.every(function (update) { return allowedUpdates.includes(update); });
                if (!isValidOperation) {
                    return [2 /*return*/, res.status(400).send({
                            error: 'Invalid Updates!'
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User.findById(_id)];
            case 2:
                user_1 = _a.sent();
                if (!user_1) {
                    return [2 /*return*/, res.status(404).send()];
                }
                updates.forEach(function (update) {
                    user_1[update] = req.body[update];
                });
                return [4 /*yield*/, user_1.save()];
            case 3:
                _a.sent();
                res.status(200).send(user_1);
                return [3 /*break*/, 5];
            case 4:
                e_8 = _a.sent();
                res.status(400).send(e_8);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
