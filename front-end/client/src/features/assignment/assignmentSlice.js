/* eslint-disable max-len */
import axios from 'axios';
import {NOTIFICATION_STYLE} from '../../utils/constants';
import {getErrorMessage} from '../../utils/getErrorObject';
import {setAlert} from '../notification/notificationSlice';

export const addAssignment = (data) => async (dispatch) => {
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
      const res = await axios.post('/api/assignment', body, config);
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


export const updateAssignment = (id, data, isSilent) => async (dispatch) => {
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
      const res = await axios.patch('/api/assignment/' + id, body, config);
      response = res.data;

      if (!isSilent) {
        if (response.isValid) {
          await dispatch(setAlert(response.jsonData, 'success'));
        } else {
          await dispatch(setAlert(response.error, 'danger'));
        }
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


export const deleteAssignment = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.delete('/api/assignment/' + id, config);
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

export const getTeacherAssignment = (lessonId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/lesson';

    try {
      const res = await axios.get(link + '/' + lessonId, config);
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

export const getStudentAssignmentByLesson = (lessonId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/student-lesson';

    try {
      const res = await axios.get(link + '/' + lessonId, config);
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


export const getListSubmissionByAssignment = (assignmentId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/list-submission-by-assignment';

    try {
      const res = await axios.get(link + '/' + assignmentId, config);
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

export const getTeacherAssignmentDetail = (assignmentId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/get-by-teacher/' + assignmentId;

    try {
      const res = await axios.get(link, config);
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

export const getTeacherAssignmentPreview = (assignmentId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/teacher-preview-assignment/' + assignmentId;

    try {
      const res = await axios.get(link, config);
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

export const getStudentViewAssignment = (assignmentId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/student-view-assignment/' + assignmentId;

    try {
      const res = await axios.get(link, config);
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


export const getStudentViewAssignmentResult = (assignmentId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/student-get-submission-by-assignment/' + assignmentId;

    try {
      const res = await axios.get(link, config);
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


export const rateSubmission = (submissionId, data) => async (dispatch) => {
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
      const res = await axios.patch('/api/assignment/rate-submission/' + submissionId, body, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert('Submitted success', 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      console.log(err);
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const submitStudentAnswer = (assignmentId, data) => async (dispatch) => {
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
      const res = await axios.post('/api/assignment/student-do-assignment/' + assignmentId, body, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert('Submitted success', 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      console.log(err);
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getSubmittedStudentAnswer = (assignmentId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/assignment/student-do-assignment/' + assignmentId, config);
      response = res.data;
      if (response.isValid) {
        // await dispatch(setAlert(, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      console.log(err);
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const updateAssignmentQuestions = (id, data) => async (dispatch) => {
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
      const res = await axios.patch('/api/assignment/content/' + id, body, config);
      response = res.data;
      if (response.isValid) {
        await dispatch(setAlert(response.jsonData, 'success'));
      } else {
        await dispatch(setAlert(response.error, 'danger'));
      }
    } catch (err) {
      console.log(err);
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    }


    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const getAllMyAssignment = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const link = '/api/assignment/my-assignments/';

    try {
      const res = await axios.get(link, config);
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
