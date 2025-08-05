import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Features/User/User.slice'
import isEditingReducer from '../Features/DashBoard/videoEditingButton.Slice'
import historyReducer from '../Features/WatchHistory/history.slice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        videoEditing:isEditingReducer,
        history:historyReducer
    }
        
})

