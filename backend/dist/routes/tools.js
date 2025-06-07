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
const express_1 = require("express");
const toolController_1 = require("../controllers/toolController");
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const toolService = __importStar(require("../services/toolService"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    (0, toolController_1.getAllTools)(req, res);
});
router.get('/featured', toolController_1.getFeaturedTools);
router.get('/latest', toolController_1.getLatestTools);
router.get('/search', toolController_1.searchTools);
router.get('/:id', (req, res) => {
    const { id } = req.params;
    toolService.getToolById(Number(id))
        .then(tool => tool ? res.json(tool) : res.status(404).end())
        .catch(() => res.status(500).end());
});
router.get('/slug/:slug', (req, res) => {
    (0, toolController_1.getToolBySlug)(req, res);
});
router.post('/:id/views', toolController_1.updateToolViews);
router.post('/', auth_1.auth, upload_1.upload.single('logo'), toolController_1.createTool);
router.put('/:id', auth_1.auth, upload_1.upload.single('logo'), toolController_1.updateTool);
router.delete('/:id', auth_1.auth, toolController_1.deleteTool);
exports.default = router;
//# sourceMappingURL=tools.js.map