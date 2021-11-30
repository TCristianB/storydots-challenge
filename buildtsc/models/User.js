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
var mongoose_1 = require("mongoose");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        requred: true,
        trim: true
    },
    email: {
        type: String,
        requred: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'owner'
});
userSchema.methods.generateAuthToken = function () {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = this;
                    token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
                    user.tokens = (_a = user.tokens) === null || _a === void 0 ? void 0 : _a.concat({ token: token });
                    return [4 /*yield*/, user.save()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, token];
            }
        });
    });
};
userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
userSchema.statics.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, isMatch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error('Unable to login');
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 2:
                    isMatch = _a.sent();
                    if (!isMatch) {
                        throw new Error('Unable to login');
                    }
                    return [2 /*return*/, user];
            }
        });
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = this;
                    if (!user.isModified('password')) return [3 /*break*/, 2];
                    _a = user;
                    return [4 /*yield*/, bcrypt.hash(user.password, 8)];
                case 1:
                    _a.password = _b.sent();
                    _b.label = 2;
                case 2:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
var User = (0, mongoose_1.model)('User', userSchema);
module.exports = User;
