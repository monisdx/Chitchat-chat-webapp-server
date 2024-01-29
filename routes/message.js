import express from 'express'
import { addmessage, getmessage } from '../controllers/messages.js'
import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/',auth, addmessage)
router.get('/:chatId',auth, getmessage)

export default router;