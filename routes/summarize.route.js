import express from 'express';
import { summarizeContent } from '../controller/summarize.controller.js';

const router = express.Router();

router.post('/summarize', summarizeContent);

export default router;