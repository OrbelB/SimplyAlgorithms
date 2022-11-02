import  {configureStore} from '@reduxjs/toolkit';
import  {rootReducer} from "./reducers"
import { userMiddleware } from '../services/user';
const store = configureStore( {
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .prepend(userMiddleware.middleware)
});

export default store;
