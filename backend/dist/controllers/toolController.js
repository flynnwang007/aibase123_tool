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
exports.updateToolViews = exports.deleteTool = exports.updateTool = exports.createTool = exports.searchTools = exports.getToolById = exports.getTools = exports.getToolBySlug = exports.getLatestTools = exports.getFeaturedTools = exports.getAllTools = void 0;
const toolService = __importStar(require("../services/toolService"));
const getAllTools = async (_req, res) => {
    try {
        const tools = await toolService.getAllTools();
        res.json(tools);
    }
    catch (error) {
        console.error('Error in getAllTools:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllTools = getAllTools;
const getFeaturedTools = async (_req, res) => {
    try {
        const tools = await toolService.getFeaturedTools();
        res.json(tools);
    }
    catch (error) {
        console.error('Error in getFeaturedTools:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getFeaturedTools = getFeaturedTools;
const getLatestTools = async (_req, res) => {
    try {
        const tools = await toolService.getLatestTools();
        res.json(tools);
    }
    catch (error) {
        console.error('Error in getLatestTools:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getLatestTools = getLatestTools;
const getToolBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const tool = await toolService.getToolBySlug(slug);
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        return res.json(tool);
    }
    catch (error) {
        console.error('Error in getToolBySlug:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getToolBySlug = getToolBySlug;
const getTools = async (_req, _res) => {
};
exports.getTools = getTools;
const getToolById = async (req, res) => {
    try {
        const { id } = req.params;
        const tool = await toolService.getToolById(Number(id));
        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        return res.json(tool);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getToolById = getToolById;
const searchTools = async (_req, _res) => {
};
exports.searchTools = searchTools;
const createTool = async (_req, _res) => {
};
exports.createTool = createTool;
const updateTool = async (_req, _res) => {
};
exports.updateTool = updateTool;
const deleteTool = async (_req, _res) => {
};
exports.deleteTool = deleteTool;
const updateToolViews = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTool = await toolService.updateToolViews(Number(id));
        res.json(updatedTool);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateToolViews = updateToolViews;
//# sourceMappingURL=toolController.js.map