"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../utils/helpers");
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, process.env.UPLOAD_DIR || 'uploads');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = (0, helpers_1.generateRandomString)(6);
        cb(null, `${Date.now()}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    }
});
const fileFilter = (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880')
    }
});
//# sourceMappingURL=upload.js.map