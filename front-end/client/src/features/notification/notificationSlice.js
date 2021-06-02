/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify';
import {NOTIFICATION_STYLE} from '../../utils/constants';
// import {store} from 'react-notifications-component';


const initialState = {
  unreadNotification: 0,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUnreadNotification: (state, action) => {
      state.unreadNotification = action.payload;
    },
    setListNotification: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setUnreadNotification,
  setListNotification,
} = notificationSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const setAlert = (msg, alertType, timeout = 0) => (dispatch) => {
  // const id = uuid();

  switch (alertType) {
    case NOTIFICATION_STYLE.SUCCESS: toast.success(msg); break;
    case 'info': toast.info(msg); break;
    case NOTIFICATION_STYLE.WARNING: toast.warn(msg); break;
    case NOTIFICATION_STYLE.DANGER: toast.error(msg); break;
    default: toast.info(msg); break;
  }
};

export const getListNotification = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/notification', config);
      response = res.data;

      if (response.isValid) {
        await dispatch(setListNotification(response.jsonData.notifications));
        await dispatch(setUnreadNotification(response.jsonData.unreadNotification));
      }
    } catch (err) {
      console.log(err);
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      // await dispatch(setLoading(false));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const pushNotification = (data) => async (dispatch) => {
  // store.addNotification({
  //   title: 'Wonderful!',
  //   message: 'teodosii@react-notifications-component',
  //   type: 'success',
  //   insert: 'top',
  //   container: 'top-center',
  //   animationIn: ['animate__animated', 'animate__fadeIn'],
  //   animationOut: ['animate__animated', 'animate__fadeOut'],
  //   dismiss: {
  //     duration: 500000,
  //     onScreen: true,
  //   },
  // });
};

export const markNotificationAsRead = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({});

    let response = {};
    try {
      const res = await axios.patch('/api/notification/read/' + id, body, config);
      response = res.data;

      if (response.isValid) {
        response = true;
      }
    } catch (err) {
      response = false;
      console.log(err);
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      // await dispatch(setLoading(false));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const selectUnreadNotification = (state) => state.notification.unreadNotification;
export const selectListNotification = (state) => state.notification.notifications;

export default notificationSlice.reducer;
