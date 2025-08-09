import { Router } from "express";
const router=Router();

import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
} from '../controllers/subscriptions.controllers.js'
import auth from "../middlewares/auth.middleware.js";

router.route('/channels/:channelId').post(auth,toggleSubscription);
router.route('/channels/:channelId/subscribers').get(getUserChannelSubscribers);
router.route('/users/:channelId/subscriptions').get(getSubscribedChannels);

export default router;