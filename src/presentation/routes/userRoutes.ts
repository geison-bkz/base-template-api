import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

const router = Router();
const userController = new UserController();

router.post('/users', userController.createUser);
router.get('/users/:id', AuthMiddleware, userController.getUser);

export default router;
