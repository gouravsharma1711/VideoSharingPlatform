import React from 'react'
import Auth from '../Auth/Auth';
import { useSelector } from "react-redux";
import Dashboard from './DashBoard';
function FinalDashBoard() {
    const user=useSelector(state=>state.user.userData);

    if(!user){
        return <Auth/>;
    }

    return (
        <Dashboard/>
    )
}

export default FinalDashBoard
