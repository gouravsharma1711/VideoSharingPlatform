import {Router} from 'express';
import {upload} from '../middlewares/multer.middleware.js'
import auth from '../middlewares/auth.middleware.js';
const router= Router();

// Import Controllers
import {
    signUpUser,
    logInUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateUserAvatar,
    updateUserCoverImage,
    updateAccountDetails,
    getUserChannelProfile,
    getWatchHistory,
    deleteAccount,
    updateWatchHistory,
    clearAllWatchHistory

} from '../controllers/users.controller.js'

router.route('/signup').post(upload.fields([
    {name:"avatar",maxCount:1},
    {name:"coverImage",maxCount:1}
]),signUpUser);

router.route('/login').post(upload.none(),logInUser);
router.route('/logout').post(upload.none(),auth,logoutUser);
router.route('/refresh-token').get(refreshAccessToken);
router.route('/current-user').get(auth,getCurrentUser);
router.route("/change-password").post(upload.none(),auth,changeCurrentPassword)
router.route("/change-avatar").patch(auth,upload.single("avatar"),updateUserAvatar);
router.route("/change-cover-image").patch(auth,upload.single("coverImage"),updateUserCoverImage);
router.route('/update-account-details').post(auth,upload.none(),updateAccountDetails);
router.route('/delete-account').delete(auth,deleteAccount);
router.route('/watchHistory').get(auth,getWatchHistory);
router.route('/profile/:userName').get(auth,getUserChannelProfile);
router.route('/updateWatchHistory/:videoId').get(upload.none(),auth,updateWatchHistory);
router.route('/clear-History').delete(auth,clearAllWatchHistory)

export default router;