import express from 'express';
import { signin, signup, getuser, getusers } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', getusers);
router.get('/:id', getuser);


export default router;