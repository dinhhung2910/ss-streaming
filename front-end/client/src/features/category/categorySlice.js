/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  list: [],
};


export const categorySlice = createSlice({
  name: 'category',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setListCategory: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {setListCategory} = categorySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectListCategory = (state) => state.category.list;

export const getAllCategories = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let response = {};
    const res = await axios.get('/api/category', config);
    response = res.data;

    dispatch(setListCategory(response));
    return response;
  } catch (err) {
    const errors = err.response ? err.response.data.errors : [err];
    console.log(errors);
  }
};

export default categorySlice.reducer;
