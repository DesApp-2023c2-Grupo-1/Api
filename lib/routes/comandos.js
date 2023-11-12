import express from 'express';

import { getAll, getId, push } from '../controllers/comando_controller';
import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(getAll));
router.get('/:id', withErrorHandling(getId));
router.post('/', withErrorHandling(push));

export default router;
