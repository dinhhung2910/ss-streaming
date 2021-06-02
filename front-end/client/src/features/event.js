import axios from 'axios';

export const sendEventToServer = (e) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token'),
    },
  };

  const content = {
    key: e.userId,
    value: e,
  };

  const body = JSON.stringify(content);
  axios.post('/api/event', body, config);
};
