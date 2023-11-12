import express from 'express';
import usuarios from './usuarios';
import comandos from './comandos';

const router = express.Router();

router.use('/api/usuarios', usuarios);
router.use('/comandos', comandos);

export default router;
