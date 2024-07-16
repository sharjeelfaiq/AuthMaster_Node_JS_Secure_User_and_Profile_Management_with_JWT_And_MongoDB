import express from 'express';
import { getAllUsers, getUser, updateUserById, deleteUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.put('/:userId', updateUserById);
router.delete('/:userId', deleteUserById);

export default router;
