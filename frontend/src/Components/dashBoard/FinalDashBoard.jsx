import React from 'react'
import Auth from '../Auth/Auth';
import { useSelector } from "react-redux";
import Dashboard from './DashBoard';
import AuthWrapper from '../Auth/AuthWrapper';
function FinalDashBoard() {
    const user=useSelector(state=>state.user.userData);

    return (
        <>
            <AuthWrapper fallbackMessage="Please sign in to view your DashBoard">
                <Dashboard/>
            </AuthWrapper>
        </>
    )
}

export default FinalDashBoard;
