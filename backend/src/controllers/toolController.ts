import { Request, Response } from 'express';
import * as toolService from '../services/toolService';

export const getAllTools = async (_req: Request, res: Response) => {
  try {
    const tools = await toolService.getAllTools();
    res.json(tools);
  } catch (error) {
    console.error('Error in getAllTools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFeaturedTools = async (_req: Request, res: Response) => {
  try {
    const tools = await toolService.getFeaturedTools();
    res.json(tools);
  } catch (error) {
    console.error('Error in getFeaturedTools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLatestTools = async (_req: Request, res: Response) => {
  try {
    const tools = await toolService.getLatestTools();
    res.json(tools);
  } catch (error) {
    console.error('Error in getLatestTools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getToolBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;
    const tool = await toolService.getToolBySlug(slug);
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    return res.json(tool);
  } catch (error) {
    console.error('Error in getToolBySlug:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTools = async (_req: Request, _res: Response) => {
  // 实现逻辑
};

export const getToolById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tool = await toolService.getToolById(Number(id));
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    return res.json(tool);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchTools = async (_req: Request, _res: Response) => {
  // TODO: 实现具体逻辑
};

export const createTool = async (_req: Request, _res: Response) => {
  // TODO: 实现具体逻辑
};

export const updateTool = async (_req: Request, _res: Response) => {
  // TODO: 实现具体逻辑
};

export const deleteTool = async (_req: Request, _res: Response) => {
  // TODO: 实现具体逻辑
};

export const updateToolViews = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTool = await toolService.updateToolViews(Number(id));
    res.json(updatedTool);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ... 其他控制器方法 