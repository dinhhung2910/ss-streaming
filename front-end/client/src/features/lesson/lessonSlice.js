/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {NOTIFICATION_STYLE} from '../../utils/constants';
import {getErrorMessage} from '../../utils/getErrorObject';
import {setAlert} from '../notification/notificationSlice';

const initialState = {
  loading: false,
  courseId: '',
  list: [],
};


export const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
  },
});

export const {setList, setLoading, setCourseId} = lessonSlice.actions;

export const getLessonByCourse =
  (courseId, getAll) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      let response = {};
      const link = getAll ?
        '/api/lesson/course-by-teacher': '/api/lesson/course-public';

      try {
        const res = await axios.get(link + '/' + courseId, config);
        response = res.data;

        if (response.isValid) {
          await dispatch(setList(response.jsonData));
        } else {
          await dispatch(setList([]));
        }
      } catch (err) {
        await dispatch(setList([]));
      } finally {
        await dispatch(setLoading(false));
      }

      return response;
    } catch (err) {
      const errors = err.response ? err.response.data.errors : [err];
      console.log(errors);
    }
  };

export const pingMeeting = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const body = JSON.stringify({});

    try {
      const res = await axios.post('/api/lesson/ping-meeting/' + id, body, config);
      response = res.data;
    } catch (err) {

    } finally {

    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getNextLesson = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};

    try {
      const res = await axios.get('/api/lesson/next-lesson/' + id, config);
      response = res.data;

      if (response.isValid) {
        response = response.jsonData;
      } else {
        dispatch(setAlert(response.error, NOTIFICATION_STYLE.DANGER));
        response = null;
      }
    } catch (err) {
      response = null;
    } finally {

    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const createLesson = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify(data);
    let response = {};
    try {
      const res = await axios.post('/api/lesson', body, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert(response.jsonData, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const updateLesson = (id, data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify(data);
    let response = {};
    try {
      const res = await axios.patch('/api/lesson/' + id, body, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert(response.jsonData, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const deleteLesson = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.delete('/api/lesson/' + id, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert(response.jsonData, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const getLessonById = (id, getAll) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/lesson/lesson-by-teacher';

    try {
      const res = await axios.get(link + '/' + id, config);
      response = res.data;

      if (response.isValid) {
        return response.jsonData;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getAllMyLesson =
  () => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      let response = {};
      const link = '/api/lesson/my-lessons';

      try {
        const res = await axios.get(link + '/', config);
        response = res.data;

        if (response.isValid) {
          response = response.jsonData;
        } else {
          response = [];
        }
      } catch (err) {
        response = [];
      }

      return response;
    } catch (err) {
      const errors = err.response ? err.response.data.errors : [err];
      console.log(errors);
    }
  };

export const getLessonByIdStudent = (id, getAll) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/lesson';

    try {
      const res = await axios.get(link + '/' + id, config);
      response = res.data;

      if (response.isValid) {
        return response.jsonData;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const startLesson = (id) => async (dispatch) => {
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
      const res = await axios.patch('/api/lesson/start-meeting/' + id, body, config);
      response = res.data;
      if (response.isValid) {
        // await dispatch(setAlert(response.jsonData, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const endLesson = (id) => async (dispatch) => {
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
      const res = await axios.patch('/api/lesson/end-meeting/' + id, body, config);
      response = res.data;
      if (response.isValid) {
        // await dispatch(setAlert(response.jsonData, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const selectLessonLoading = (state) => state.lesson.loading;
export const selectLessonCourseId = (state) => state.lesson.courseId;
export const selectListLesson = (state) => state.lesson.list;

export default lessonSlice.reducer;
