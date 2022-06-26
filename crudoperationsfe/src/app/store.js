import {configureStore} from '@reduxjs/toolkit';
import postReducer from './features/PostSlice';
import getDataReducer from './features/GetRecordsSlice';
import putReducer from './features/UpdateRecordSlice';
import deleteReducer from './features/DeleteRecordSlice';

const store =configureStore({
    reducer:{
        post:postReducer,
        get:getDataReducer,
        put:putReducer,
        delete:deleteReducer,
    }
})

export default store;

// export type RootState=ReturnType<typeof store.getState>;