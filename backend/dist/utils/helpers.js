"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = exports.generateRandomString = exports.slugify = void 0;
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};
exports.slugify = slugify;
const generateRandomString = (length) => {
    return Math.random().toString(36).substring(2, length + 2);
};
exports.generateRandomString = generateRandomString;
const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isValidUrl = isValidUrl;
//# sourceMappingURL=helpers.js.map