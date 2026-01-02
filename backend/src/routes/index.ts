import { Router } from 'express';
import authRoutes from './auth.routes.js';
import matchRoutes from './match.routes.js';
import favoriteRoutes from './favorite.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/matches', matchRoutes);
router.use('/favorites', favoriteRoutes);

export default router;
