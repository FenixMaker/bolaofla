import express from 'express';
import { cadastrarPalpite, listarPalpites } from '../controllers/palpites.js';
import { atualizarPlacar, finalizarJogo } from '../controllers/admin.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Rotas públicas
router.post('/palpites', cadastrarPalpite);
router.get('/palpites', listarPalpites);

// Rotas protegidas (admin)
router.post('/update-score', authMiddleware, atualizarPlacar);
router.post('/finalizar-jogo', authMiddleware, finalizarJogo);

export default router;