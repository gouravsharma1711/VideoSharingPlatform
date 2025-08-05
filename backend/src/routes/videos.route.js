import {Router} from 'express';
const router=Router();

import {
    getUserVideos,
    getAllVideos,
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    updateThumbnail,
    getSingleView,
    getCurrentUserVideos
} from '../controllers/videos.controller.js';

import auth from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';


router.route('/:userId/videos').get(getUserVideos);
router.route('/').get(getAllVideos);
router.route('/user-videos').get(auth,getCurrentUserVideos);// add this in postman to test it
router.route('/publish-video').post(upload.fields([
    {name:"videoFile",maxCount:1},
    {name:"thumbnail",maxCount:1}
]),auth,publishVideo);

router.route('/video/:id').get(getVideoById);
router.route('/update/:videoId').patch(upload.none(),auth,updateVideo);
router.route('/delete/:videoId').delete(auth,deleteVideo);
router.route("/publish-status/:videoId").get(auth,togglePublishStatus);
router.route('/update-thumbnail/:videoId').patch(upload.single("thumbnail"),auth,updateThumbnail);
router.route('/:videoId').get(getSingleView);



export default router;