import express from 'express';
import { signin, signup, getuser, getusers, getUsersBySearch } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/search', auth,getUsersBySearch);
router.get('/:id', getuser);


export default router;