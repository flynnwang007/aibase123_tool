import { Router } from 'express';
import { 
  getAllTools,
  getToolBySlug,
  getFeaturedTools,
  getLatestTools,
  searchTools,
  createTool,
  updateTool,
  deleteTool,
  updateToolViews
} from '../controllers/toolController';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { Request, Response, ParamsDictionary } from 'express-serve-static-core';
import * as toolService from '../services/toolService';

const router = Router();

// 公开路由
router.get('/', (req: Request<ParamsDictionary>, res: Response) => {
  getAllTools(req, res);
});
router.get('/featured', getFeaturedTools);
router.get('/latest', getLatestTools);
router.get('/search', searchTools);
router.get('/category/:slug', async (req, res) => {
  try {
    const tools = await toolService.getToolsByCategory(req.params.slug);
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  toolService.getToolById(Number(id))
    .then(tool => tool ? res.json(tool) : res.status(404).end())
    .catch(() => res.status(500).end());
});
router.get('/slug/:slug', (req: Request, res: Response) => {
  getToolBySlug(req as Request<{ slug: string }>, res);
});
router.post('/:id/views', updateToolViews);

// 需要认证的路由
router.post('/', auth, upload.single('logo'), createTool);
router.put('/:id', auth, upload.single('logo'), updateTool);
router.delete('/:id', auth, deleteTool);

export default router; 