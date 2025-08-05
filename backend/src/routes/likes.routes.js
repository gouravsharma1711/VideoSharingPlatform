import { Router } from "express";
import {upload} from '../middlewares/multer.middleware.js'
const router=Router();

import {
    toggleCommentLike,
    toggleVideoLike,
    getLikedVideos,
    isCurrentUserLikedTheComment,
    isCurrentUserLikedTheVideo,
} from '../controllers/likes.controllers.js'
import auth from "../middlewares/auth.middleware.js";

router.use(auth);
router.route("/videos/:videoId/toggle").post(toggleVideoLike);
router.route('/comments/:commentId/toggle').post(toggleCommentLike);
router.route('/videos').get(auth,getLikedVideos);
router.route('/isCommentLiked').post(upload.none(),isCurrentUserLikedTheComment)
router.route('/isVideoLiked').post(upload.none(),isCurrentUserLikedTheVideo)


export default router;