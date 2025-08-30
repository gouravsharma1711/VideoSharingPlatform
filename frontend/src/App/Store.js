import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Features/User/User.slice'
import isEditingReducer from '../Features/DashBoard/videoEditingButton.Slice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        videoEditing:isEditingReducer,
    }
        
})

