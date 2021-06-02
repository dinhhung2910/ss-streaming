import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import navbarReducer from '../features/navbar/navbarSlice';
import courseReducer from '../features/course/courseSlice';
import lessonReducer from '../features/lesson/lessonSlice';
import conversationReducer from '../features/conversation/conversationSlice';
import notificationReducer from '../features/notification/notificationSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    navbar: navbarReducer,
    course: courseReducer,
    lesson: lessonReducer,
    conversation: conversationReducer,
    notification: notificationReducer,
    category: categoryReducer,
    product: productReducer,
  },
});
