import express from 'express';
import {createChat, userChats, createGroupChat, renameGroupChat, removeGroupChat, addGroupChat} from '../controllers/chats.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createChat)
router.get('/', auth, userChats)
router.post('/group', auth, createGroupChat)
router.put('/renamegroup',auth, renameGroupChat)
router.put('/removegroup', auth, removeGroupChat)
router.put('/addgroup', auth,addGroupChat)

export default router;