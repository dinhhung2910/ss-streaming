/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {NOTIFICATION_STYLE} from '../../utils/constants';
import {getErrorMessage} from '../../utils/getErrorObject';
import {setAlert} from '../notification/notificationSlice';


const initialState = {
  list: [],
  loading: true,
  course: null,
};


export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setList, setLoading} = courseSlice.actions;

export const createCourse = (data) => async (dispatch) => {
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
      const res = await axios.post('/api/course', body, config);
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

export const updateCourse = (id, data) => async (dispatch) => {
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
      const res = await axios.patch('/api/course/' + id, body, config);
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

export const deleteCourse = (id, data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.delete('/api/course/' + id, config);
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

export const getAllCourseByTeacher = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/course/all-by-teacher', config);
      response = res.data;

      if (response.isValid) {
        await dispatch(setList(response.jsonData));
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      await dispatch(setLoading(false));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getAllCourseByStudent = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/course/all-by-student', config);
      response = res.data;

      if (response.isValid) {
        await dispatch(setList(response.jsonData));
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      await dispatch(setLoading(false));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getAllPublicCourseByTeacher = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/course/all-by-teacher-public/' + id, config);
      response = res.data;

      if (response.isValid) {
        response = response.jsonData;
      }
    } catch (err) {
      response = [];
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const getCourseById = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = null;
    try {
      const res = await axios.get('/api/course/' + id, config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }

      if (response.isValid) {
        await dispatch(setList(response.jsonData));
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getRandomCourse = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = null;
    try {
      const res = await axios.get('/api/course/random', config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getListPopularCourse = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = null;
    try {
      const res = await axios.get('/api/course/popular', config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getListRandomCourse = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = [];
    try {
      const res = await axios.get('/api/course/list-random', config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const getCourseByCategory = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = null;
    try {
      const res = await axios.get('/api/course/category/' + id, config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const purchaseCourse = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      courseId: id,
    });

    let response = {};
    try {
      const res = await axios.post('/api/invoice', body, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert('Purchase sucessfully', 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
      return response.isValid;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
      return false;
    }
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const checkBuyCourse = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify({
      courseId: id,
    });

    let response = {};
    try {
      const res = await axios.post('/api/course/checkBuy', body, config);
      response = res.data;
      if (response.isValid) {
        return response.jsonData;
      } else {
        return false;
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      console.log(errorMessage);
      return false;
    }
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
    return false;
  }
};

export const getParticipantsInCourse = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = [];
    try {
      const res = await axios.get('/api/course/participant/' + id, config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


/**
 * Get course comments
 * @param {*} id
 * @return {*}
 */
export const getCourseComments = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = [];
    try {
      const res = await axios.get('/api/course/student-comments/' + id, config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

/**
 * Get student review
 * @param {*} id
 * @return {*}
 */
export const getStudentReview = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = [];
    try {
      const res = await axios.get('/api/course/student-review/' + id, config);
      if (res.data && res.data.isValid) {
        response = res.data.jsonData;
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const submitStudentReview = (id, data) => async (dispatch) => {
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
      const res = await axios.patch('/api/course/student-review/' + id,
        body,
        config,
      );
      response = res.data;
      console.log(response);

      if (response.isValid) {
        await dispatch(setAlert('Submitted successfully', 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
      return response.isValid;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
      return false;
    }
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const searchCourse = (query, sort) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = {
      query: query,
      sort: sort,
    };

    let response = {};
    try {
      const res = await axios.post('/api/course/search', body, config);
      response = res.data;

      if (response.isValid) {
        return response.jsonData;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const selectListCourse = (state) => state.course.list;

export default courseSlice.reducer;
