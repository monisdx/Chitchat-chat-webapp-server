import express from 'express'
import { addmessage, getmessage } from '../controllers/messages.js'

const router = express.Router()

router.post('/', addmessage)
router.get('/:chatId', getmessage)

export default router;