import {Router} from 'express';

const router = Router();

import auth from '../middlewares/auth.middleware.js';
import {getChannelStats} from '../controllers/dashboard.controllers.js'

router.route('/').get(auth,getChannelStats);

export default router;