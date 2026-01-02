import { Router } from 'express';
import { getFavorites, getFavoriteIds, addFavorite, removeFavorite } from '../controllers/favorite.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /favorites - Get user's favorites with pagination
router.get('/', getFavorites);

// GET /favorites/ids - Get just the match IDs (for quick lookup)
router.get('/ids', getFavoriteIds);

// POST /favorites/:matchId - Add a match to favorites
router.post('/:matchId', addFavorite);

// DELETE /favorites/:matchId - Remove a match from favorites
router.delete('/:matchId', removeFavorite);

export default router;
