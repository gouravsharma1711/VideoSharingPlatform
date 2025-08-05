import express from 'express';
const app=express();
import cors from 'cors';
import cookieParser from 'cookie-parser';

const DataLimit="20kb";

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({
    extended:true,
    limit:DataLimit
}));
app.use(express.json({
    limit:DataLimit
}))
app.use(express.static('public'));
app.use(cookieParser());

// Router Import  
import UserRouter from './routes/users.routes.js';
import VideoRouter from './routes/videos.route.js'
import SubscriptionRouter from './routes/subscriptions.routes.js'
import CommentRouter from './routes/comments.routes.js'
import LikeRouter from './routes/likes.routes.js'
import DashboardRouter from './routes/dashboard.routes.js'
import PlaylistRouter from './routes/playlist.routes.js'

app.use('/api/v1/users',UserRouter);
app.use('/api/v1/videos',VideoRouter);
app.use('/api/v1/subscriptions',SubscriptionRouter);
app.use('/api/v1/comments',CommentRouter);
app.use('/api/v1/likes',LikeRouter);
app.use('/api/v1/dashboard',DashboardRouter);
app.use('/api/v1/playlist',PlaylistRouter);

export {app};