import { Router } from 'express';

import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} from '../controllers/playlist.controllers.js';

import auth from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/', auth,upload.none(),createPlaylist);
router.get('/user/:userId', getUserPlaylists);
router.get('/:playlistId', getPlaylistById);
router.patch('/:playlistId/videos/:videoId', auth,addVideoToPlaylist);
router.delete('/:playlistId/videos/:videoId',auth, removeVideoFromPlaylist);
router.post('/:playlistId',upload.none(),auth, updatePlaylist);
router.delete('/:playlistId',auth, deletePlaylist);

export default router;
