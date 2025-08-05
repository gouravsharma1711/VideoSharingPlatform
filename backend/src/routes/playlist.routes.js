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

router.use(auth);

router.post('/', upload.none(),createPlaylist);
router.get('/user/:userId', getUserPlaylists);
router.get('/:playlistId', getPlaylistById);
router.patch('/:playlistId/videos/:videoId', addVideoToPlaylist);
router.delete('/:playlistId/videos/:videoId', removeVideoFromPlaylist);
router.post('/:playlistId',upload.none(), updatePlaylist);
router.delete('/:playlistId', deletePlaylist);

export default router;
