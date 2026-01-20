import express from 'express';
import {save_food , get_food, update_food, delete_food} from '../controllers/food.js'

const router = express.Router();

router.post('/savefood', save_food);
router.get('/getfood', get_food)
router.put('/food/:id', update_food)
router.delete('/food/:id', delete_food)

export default router;