import { Router } from 'express';
import { handleSolidity, handleMove } from '../controllers/handleController';
import { uploadSol, uploadMove } from '../config/multerConfig';

const router = Router();

router.post('/upload/solidity', uploadSol.single('file'), handleSolidity);
router.post('/upload/move', uploadMove.single('file'), handleMove);

export default router;