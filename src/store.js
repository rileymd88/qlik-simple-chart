import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './states/mainSlice'
export default configureStore({
  reducer: {
    main: mainReducer
  },
});