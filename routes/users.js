import express from 'express';
import { signin, signup, getUsersBySearch } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/search', auth,getUsersBySearch);


export default router;