"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToolData = exports.validateUserData = exports.validateUrl = exports.validateUsername = exports.validatePassword = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.validatePassword = validatePassword;
const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};
exports.validateUsername = validateUsername;
const validateUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.validateUrl = validateUrl;
const validateUserData = (data) => {
    const errors = [];
    if (!data.username || !(0, exports.validateUsername)(data.username)) {
        errors.push('Username must be 3-20 characters long and contain only letters, numbers and underscores');
    }
    if (!data.email || !(0, exports.validateEmail)(data.email)) {
        errors.push('Invalid email format');
    }
    if (!data.password || !(0, exports.validatePassword)(data.password)) {
        errors.push('Password must be at least 8 characters long and contain uppercase, lowercase, number and special character');
    }
    return errors;
};
exports.validateUserData = validateUserData;
const validateToolData = (data) => {
    var _a, _b;
    const errors = [];
    if (!((_a = data.name) === null || _a === void 0 ? void 0 : _a.trim()) || data.name.length < 2 || data.name.length > 100) {
        errors.push('Name must be between 2 and 100 characters');
    }
    if (!((_b = data.description) === null || _b === void 0 ? void 0 : _b.trim()) || data.description.length < 10) {
        errors.push('Description must be at least 10 characters');
    }
    if (!data.website_url || !(0, exports.validateUrl)(data.website_url)) {
        errors.push('Valid website URL is required');
    }
    if (!data.category_id) {
        errors.push('Category is required');
    }
    if (data.tags && (!Array.isArray(data.tags) || data.tags.length === 0)) {
        errors.push('At least one tag is required');
    }
    return errors;
};
exports.validateToolData = validateToolData;
//# sourceMappingURL=validators.js.map