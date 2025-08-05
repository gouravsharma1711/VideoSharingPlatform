import {Router} from 'express';
const router= Router();
import {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
} from '../controllers/comments.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';
import auth from '../middlewares/auth.middleware.js';

router.route('/:videoId/comments').get(getVideoComments);
router.route('/:videoId/add').post(auth,upload.none(),addComment);
router.route("/:commentId/update").patch(auth,upload.none(),updateComment);
router.route('/:commentId/delete').delete(auth,deleteComment);

export default router;