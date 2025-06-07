"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToolById = exports.searchTools = exports.updateToolViews = exports.createTool = exports.getToolBySlug = exports.getLatestTools = exports.getFeaturedTools = exports.getAllTools = void 0;
const database_1 = __importDefault(require("../config/database"));
const helpers_1 = require("../utils/helpers");
const getAllTools = async () => {
    const [rows] = await database_1.default.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1
    GROUP BY t.id
    ORDER BY t.views DESC
  `);
    return formatToolResults(rows);
};
exports.getAllTools = getAllTools;
const getFeaturedTools = async () => {
    const [rows] = await database_1.default.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1 AND t.featured = 1
    GROUP BY t.id
    ORDER BY t.views DESC
    LIMIT 8
  `);
    return formatToolResults(rows);
};
exports.getFeaturedTools = getFeaturedTools;
const getLatestTools = async () => {
    const [rows] = await database_1.default.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1
    GROUP BY t.id
    ORDER BY t.created_at DESC
    LIMIT 8
  `);
    return formatToolResults(rows);
};
exports.getLatestTools = getLatestTools;
const getToolBySlug = async (slug) => {
    const [rows] = await database_1.default.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.slug = ? AND t.status = 1
    GROUP BY t.id
  `, [slug]);
    const tools = formatToolResults(rows);
    return tools.length > 0 ? tools[0] : null;
};
exports.getToolBySlug = getToolBySlug;
const createTool = async (data, tagIds) => {
    const connection = await database_1.default.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.query(`
      INSERT INTO tools (name, slug, description, logo_url, website_url, category_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
            data.name,
            (0, helpers_1.slugify)(data.name),
            data.description,
            data.logo_url,
            data.website_url,
            data.category_id
        ]);
        const toolId = result.insertId;
        if (tagIds.length > 0) {
            const values = tagIds.map(tagId => [toolId, tagId]);
            await connection.query(`
        INSERT INTO tool_tags (tool_id, tag_id) VALUES ?
      `, [values]);
        }
        await connection.commit();
        return toolId;
    }
    catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }
};
exports.createTool = createTool;
const updateToolViews = async (id) => {
    await database_1.default.query(`
    UPDATE tools 
    SET views = views + 1 
    WHERE id = ?
  `, [id]);
};
exports.updateToolViews = updateToolViews;
const searchTools = async (query) => {
    const [rows] = await database_1.default.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1 
    AND (
      t.name LIKE ? OR 
      t.description LIKE ? OR 
      tag.name LIKE ?
    )
    GROUP BY t.id
    ORDER BY t.views DESC
  `, [`%${query}%`, `%${query}%`, `%${query}%`]);
    return formatToolResults(rows);
};
exports.searchTools = searchTools;
const getToolById = async (id) => {
    const [rows] = await database_1.default.query('SELECT * FROM tools WHERE id = ?', [id]);
    return rows[0] || null;
};
exports.getToolById = getToolById;
const formatToolResults = (rows) => {
    return rows.map(row => (Object.assign(Object.assign({}, row), { featured: Boolean(row.featured), tags: row.tag_ids
            ? row.tag_ids.split(',').map((id, index) => ({
                id: parseInt(id),
                name: row.tag_names.split(',')[index]
            }))
            : [] })));
};
//# sourceMappingURL=toolService.js.map