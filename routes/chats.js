import express from 'express';
import {createchat, userchats, findchat} from '../controllers/chats.js';

const router = express.Router();

router.post('/', createchat)
router.get('/:userid', userchats)
router.get('/find/:firstid/:secondid', findchat)



export default router;