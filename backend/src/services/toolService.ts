import pool from '../config/database';
import { Tool, Category } from '../types';
import { slugify } from '../utils/helpers';
import { RowDataPacket } from 'mysql2';

export const getAllTools = async (): Promise<Tool[]> => {
  const [rows] = await pool.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1
    GROUP BY t.id
    ORDER BY t.views DESC
  `);
  return formatToolResults(rows as any[]);
};

export const getFeaturedTools = async (): Promise<Tool[]> => {
  const [rows] = await pool.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1 AND t.featured = 1
    GROUP BY t.id
    ORDER BY t.views DESC
    LIMIT 8
  `);
  return formatToolResults(rows as any[]);
};

export const getLatestTools = async (): Promise<Tool[]> => {
  const [rows] = await pool.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.status = 1
    GROUP BY t.id
    ORDER BY t.created_at DESC
    LIMIT 8
  `);
  return formatToolResults(rows as any[]);
};

export const getToolBySlug = async (slug: string): Promise<Tool | null> => {
  const [rows] = await pool.query(`
    SELECT t.*, GROUP_CONCAT(tag.id) as tag_ids, GROUP_CONCAT(tag.name) as tag_names
    FROM tools t
    LEFT JOIN tool_tags tt ON t.id = tt.tool_id
    LEFT JOIN tags tag ON tt.tag_id = tag.id
    WHERE t.slug = ? AND t.status = 1
    GROUP BY t.id
  `, [slug]);
  
  const tools = formatToolResults(rows as any[]);
  return tools.length > 0 ? tools[0] : null;
};

export const createTool = async (data: Partial<Tool>, tagIds: number[]) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(`
      INSERT INTO tools (name, slug, description, logo_url, website_url, category_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      data.name,
      slugify(data.name!),
      data.description,
      data.logo_url,
      data.website_url,
      data.category_id
    ]);

    const toolId = (result as any).insertId;

    // 添加标签关联
    if (tagIds.length > 0) {
      const values = tagIds.map(tagId => [toolId, tagId]);
      await connection.query(`
        INSERT INTO tool_tags (tool_id, tag_id) VALUES ?
      `, [values]);
    }

    await connection.commit();
    return toolId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updateToolViews = async (id: number): Promise<void> => {
  await pool.query(`
    UPDATE tools 
    SET views = views + 1 
    WHERE id = ?
  `, [id]);
};

export const searchTools = async (query: string): Promise<Tool[]> => {
  const [rows] = await pool.query(`
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

  return formatToolResults(rows as any[]);
};

export const getToolById = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM tools WHERE id = ?', [id]);
  return (rows as any[])[0] || null;
};

export const getToolsByCategory = async (slug: string): Promise<Tool[]> => {
  try {
    const [categories] = await pool.query<Category[] & RowDataPacket[]>(
      'SELECT id FROM categories WHERE slug = ?', 
      [slug]
    );
    
    if (categories.length === 0) {
      return [];
    }

    const [tools] = await pool.query<RowDataPacket[]>(
      `SELECT t.*, 
        GROUP_CONCAT(tag.id) as tag_ids,
        GROUP_CONCAT(tag.name) as tag_names
       FROM tools t
       LEFT JOIN tool_tags tt ON t.id = tt.tool_id
       LEFT JOIN tags tag ON tt.tag_id = tag.id
       WHERE t.category_id = ?
       GROUP BY t.id`,
      [categories[0].id]
    );
    
    return formatToolResults(tools);
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const formatToolResults = (rows: any[]): Tool[] => {
  return rows.map(row => ({
    ...row,
    featured: Boolean(row.featured),
    tags: row.tag_ids
      ? row.tag_ids.split(',').map((id: string, index: number) => ({
          id: parseInt(id),
          name: row.tag_names.split(',')[index]
        }))
      : []
  }));
}; 