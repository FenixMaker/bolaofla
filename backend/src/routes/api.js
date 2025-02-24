import { Router } from 'express';
import * as adminController from '../controllers/admin.js';
import * as palpitesController from '../controllers/palpites.js';
// import auth from '../middleware/auth.js'; // se necessário

const router = Router();

router.get('/sincronizar-jogo', adminController.sincronizarJogo);
router.get('/palpites', palpitesController.getPalpites);
router.post('/palpite', palpitesController.criarPalpite);
router.post('/placar', adminController.atualizarPlacar);

export default router;
