"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const userService = __importStar(require("../services/userService"));
const validators_1 = require("../utils/validators");
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!(0, validators_1.validateEmail)(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (!(0, validators_1.validatePassword)(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            });
        }
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const userId = await userService.createUser({ username, email, password });
        const token = userService.generateToken(userId, 'user');
        return res.status(201).json({ token });
    }
    catch (error) {
        console.error('Error in register:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValid = await userService.validatePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = userService.generateToken(user.id, user.role);
        return res.json({ token });
    }
    catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!(0, validators_1.validateEmail)(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const token = await userService.createPasswordResetToken(email);
        return res.json({
            message: 'Password reset instructions sent to your email',
            token
        });
    }
    catch (error) {
        console.error('Error in forgotPassword:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!(0, validators_1.validatePassword)(newPassword)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character'
            });
        }
        await userService.resetPassword(token, newPassword);
        return res.json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error('Error in resetPassword:', error);
        if (error instanceof Error && error.message === 'Invalid or expired reset token') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.resetPassword = resetPassword;
const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map