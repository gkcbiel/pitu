import {Router} from 'express';
import linksController from '../controllers/linksController'

const router = Router();

router.post('/links', linksController.postLink)

router.get('/links/:code', linksController.hitLink)

router.get('/links/:code/stats', linksController.getlink)


export default router;