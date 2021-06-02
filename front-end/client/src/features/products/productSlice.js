/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {NOTIFICATION_STYLE} from '../../utils/constants';
import {setAlert} from '../notification/notificationSlice';

const initialState = {
  list: [],
  loading: true,
};


export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setList, setLoading} = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProductList = (state) => state.product.list;
export const selectProductLoading = (state) => state.product.loading;

export const addProduct = (product) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const body = JSON.stringify(product);
    await axios.post('/api/product', body, config);
    await dispatch(setAlert('Add success', NOTIFICATION_STYLE.SUCCESS));
    await dispatch(loadListProduct());
  } catch (e) {
    console.error(e);
  }
};

export const loadListProduct = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const res = await axios.get('/api/product', config);
    const response = res.data;

    dispatch(setList(response));
    dispatch(setLoading(false));
  } catch (e) {
    console.error(e);
  }
};

export default productSlice.reducer;
