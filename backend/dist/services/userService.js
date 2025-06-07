"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.createPasswordResetToken = exports.generateToken = exports.validatePassword = exports.findUserByEmail = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const createUser = async (userData) => {
    const hashedPassword = await bcryptjs_1.default.hash(userData.password, 10);
    const [result] = await database_1.default.query(`
    INSERT INTO users (username, email, password, role)
    VALUES (?, ?, ?, ?)
  `, [userData.username, userData.email, hashedPassword, 'user']);
    return result.insertId;
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const [rows] = await database_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows;
    return users.length > 0 ? users[0] : null;
};
exports.findUserByEmail = findUserByEmail;
const validatePassword = async (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.validatePassword = validatePassword;
const generateToken = (userId, role) => {
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        algorithm: 'HS256'
    };
    return jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET, options);
};
exports.generateToken = generateToken;
const createPasswordResetToken = async (email) => {
    const user = await (0, exports.findUserByEmail)(email);
    if (!user) {
        throw new Error('User not found');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, type: 'password_reset' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await database_1.default.query(`
    UPDATE users 
    SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR)
    WHERE id = ?
  `, [token, user.id]);
    return token;
};
exports.createPasswordResetToken = createPasswordResetToken;
const resetPassword = async (token, newPassword) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const [rows] = await database_1.default.query(`
    SELECT * FROM users 
    WHERE id = ? AND reset_token = ? AND reset_token_expires > NOW()
  `, [decoded.userId, token]);
    if (!rows || !rows.length) {
        throw new Error('Invalid or expired reset token');
    }
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    await database_1.default.query(`
    UPDATE users 
    SET password = ?, reset_token = NULL, reset_token_expires = NULL 
    WHERE id = ?
  `, [hashedPassword, decoded.userId]);
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=userService.js.map