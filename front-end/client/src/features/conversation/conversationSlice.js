/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {NOTIFICATION_STYLE} from '../../utils/constants';
import {getErrorMessage} from '../../utils/getErrorObject';
import {setAlert} from '../notification/notificationSlice';


const initialState = {
  listConversation: [],
  unreadMessage: 0,
  listMessage: [],
  conversationId: '',
  showChatbox: false,
};


export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setShowChatbox: (state, action) => {
      state.showChatbox = action.payload;
    },
    setListConversation: (state, action) => {
      state.listConversation = action.payload;
    },
    setUnreadMessage: (state, action) => {
      state.unreadMessage = action.payload;
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    setListMessage: (state, action) => {
      state.listMessage = action.payload;
    },
    pushMessage: (state, action) => {
      if (action.payload.conversationId == state.conversationId) {
        state.listMessage = state.listMessage.concat(action.payload);
      }
    },
  },
});

export const {
  setShowChatbox,
  setListConversation,
  setUnreadMessage,
  setConversationId,
  setListMessage,
  pushMessage,
} = conversationSlice.actions;


export const getListConversation = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/conversation', config);
      response = res.data;

      if (response.isValid) {
        await dispatch(setListConversation(response.jsonData.conversations));
        await dispatch(setUnreadMessage(response.jsonData.unreadMessage));
      }
    } catch (err) {
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

export const setConversationStatus = (id, status) => async (dispatch, getState) => {
  delete status._id;
  const listConversation = selectListConversation(getState());
  let conversation = listConversation.find((en) => en._id == id);

  if (conversation == null) {

  } else {
    conversation = {
      ...conversation,
      ...status,
    };

    await dispatch(setListConversation(listConversation.map((en) => {
      if (en._id != id) return en;
      else return conversation;
    })));
  }
};

/**
 * When receive new message via socket, call this function
 * to update conversation redux store
 * @param {*} id conversationId
 * @param {*} message message object
 * @return {*}
 */
export const setNewMessage = (id, message) => async (dispatch, getState) => {
  const listConversation = selectListConversation(getState());
  const conversation = listConversation.find((en) => en._id == id);
  const unreadMessage = selectUnreadMessage(getState());

  if (conversation == null) {
    dispatch(getListConversation());
  } else {
    if (conversation.isRead) {
      dispatch(setUnreadMessage(unreadMessage + 1));
    }

    dispatch(setConversationStatus(id, {
      isRead: false,
      lastMessageId: message,
    }));
  }
};

export const getMessage = (id) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/conversation/' + id, config);
      response = res.data;

      if (response.isValid) {
        response = response.jsonData;
        await dispatch(setUnreadMessage(response.unreadMessage));
        await dispatch(setConversationStatus(id, {
          isRead: true,
        }));
        await dispatch(setListMessage(response.message));
      }
    } catch (err) {
      // const errorMessage = getErrorMessage(err);
      // dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      // await dispatch(setLoading(false));
    }

    // return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const sendMessage = (id, content) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    const body = JSON.stringify({content});
    try {
      const res = await axios.post('/api/conversation/' + id, body, config);
      response = res.data;

      if (response.isValid) {
        await dispatch(getListConversation());
      }
    } catch (err) {
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


export const getDirectConversationId = (id) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.get('/api/conversation/direct-conversation-id/' + id, config);
      response = res.data;

      if (response.isValid) {
        response = response.jsonData;
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      // await dispatch(setLoading(false));
    }

    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};


export const deleteConversation = (id) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    let response = {};
    try {
      const res = await axios.patch('/api/conversation/delete-conversation/' + id, JSON.stringify({}), config);
      response = res.data;

      if (response.isValid) {
        // response = response.jsonData;
        await dispatch(getMessage(id));
        await dispatch(getListConversation());
        dispatch(setAlert(response.jsonData, NOTIFICATION_STYLE.SUCCESS));
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      dispatch(setAlert(errorMessage, NOTIFICATION_STYLE.DANGER));
    } finally {
      // await dispatch(setLoading(false));
    }

    // return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export const selectShowChatbox = (state) => state.conversation.showChatbox;
export const selectUnreadMessage = (state) => state.conversation.unreadMessage;
export const selectListConversation = (state) => state.conversation.listConversation;
export const selectConversationId = (state) => state.conversation.conversationId;
export const selectListMessage = (state) => state.conversation.listMessage;

export default conversationSlice.reducer;

