import { Router } from 'express';
import { getMatches, getMatchById, getSports, getLeagues } from '../controllers/match.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /matches - List matches with filters, search, pagination
router.get('/', getMatches);

// GET /matches/sports - Get distinct sports
router.get('/sports', getSports);

// GET /matches/leagues - Get distinct leagues
router.get('/leagues', getLeagues);

// GET /matches/:id - Get single match
router.get('/:id', getMatchById);

export default router;
