import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout.jsx";
import Home from './Components/Home/Home.jsx'
import User from './Components/Profile/User.jsx'
import VideoPage from './Components/VideoPlayer/VideoPage.jsx'
import SignUp from './Components/Signup/SignUp.jsx'
import WatchHistory from './Components/watchHistory/WatchHistory.jsx'
import SignIn from './Components/signIn/SignIn.jsx'
import Dashboard from "./Components/dashBoard/FinalDashBoard.jsx";
import Subscriptions from './Components/Subscriptions/Subscriptions.jsx'
import UserLikes from './Components/UserLikes/UserLikes.jsx'
import UserContent from './Components/UserContent/UserContent.jsx'
import Playlist from './Components/PlayList/PlaylistPage.jsx'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser, logOutUser } from "./Features/User/User.slice.js";
import SearchResultPage from './Components/searchResult/SearchResultPage.jsx'

function App() {
  const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'videos/:videoId', element: <VideoPage /> },
      { path: 'results', element: <SearchResultPage /> },
      {
        // Path for all user-related routes
        path: 'user',
        children: [
          // Static routes MUST come BEFORE dynamic routes
          { path: 'signup', element: <SignUp /> },
          { path: 'signin', element: <SignIn /> },
          { path: 'watch-history', element: <WatchHistory /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'likes', element: <UserLikes /> },
          { path: 'content', element: <UserContent /> },
          { path: 'playlist/:playlistId', element: <Playlist /> },
          { path: 'subscriptions', element: <Subscriptions /> },
          
          // Dynamic route is last
          { path: ':userName', element: <User /> },
        ]
      }
    ]
  },
]);


  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App;
