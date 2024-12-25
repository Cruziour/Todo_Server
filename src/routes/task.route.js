import express from 'express';
import { handleTaskAdd, handleShowAllTask, handleDeleteTask, handleUpdateTask, handleTaskShowById } from '../controllers/task.controller.js';

const router = express.Router();

router.route('/')
    .post(handleTaskAdd)
    .get(handleShowAllTask);

router.route('/:id')
    .delete(handleDeleteTask)
    .put(handleUpdateTask)
    .get(handleTaskShowById)

export default router;
