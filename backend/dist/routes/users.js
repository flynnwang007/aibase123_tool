"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
router.post('/forgot-password', userController_1.forgotPassword);
router.post('/reset-password', userController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=users.js.map