/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  list: [],
  selectedUserId: '',
  loading: true,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    select: (state, action) => {
      state.selectedUserId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setList, select, setLoading} = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectList = (state) => state.user.list;
export const selectUserId = (state) => state.user.selectedUserId;
export const selectUserLoading = (state) => state.user.loading;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export const loadList = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const res = await axios.get('/api/user', config);
    const response = res.data;

    const selectedUserId = selectUserId(getState());
    dispatch(setList(response));
    dispatch(setLoading(false));
    if (response && response.length && !selectedUserId) {
      dispatch(select(response[0]._id));
    }
  } catch (e) {
    console.error(e);
  }
};

export default userSlice.reducer;
