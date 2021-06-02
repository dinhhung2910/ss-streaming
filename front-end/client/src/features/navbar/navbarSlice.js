/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isMobile: null,
  showMobileMenu: false,
  showSearchbox: false,
  breadcrumbs: [],
  scrollTop: 0,
  style: {},
  classes: [],
};


export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleShowMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    pushBreadcrumb: (state, action) => {
      state.breadcrumbs = state.breadcrumbs.concat(action.payload);
    },
    popBreadcrumb: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.breadcrumbs = state.breadcrumbs.filter((en) => !action.payload.includes(en.link));
      } else {
        state.breadcrumbs = state.breadcrumbs.filter((en) => en.link != action.payload);
      }
    },
    setStyle: (state, action) => {
      state.style = Object.assign(state.style, action.payload);
    },
    clearStyle: (state, action) => {
      const clone = Object.assign(state.style, {});
      delete clone[action.payload];
      state.style = clone;
    },
    pushClasses: (state, action) => {
      const clone = state.classes;
      if (typeof action.payload === 'string') {
        action.payload = [action.payload];
      };

      if (Array.isArray(action.payload)) {
        action.payload.forEach((en) => {
          if (!clone.includes(en)) clone.push(en);
        });
      }

      state.classes = clone;
    },
    popClasses: (state, action) => {
      if (typeof action.payload === 'string') {
        action.payload = [action.payload];
      };
      state.classes = state.classes.filter((en) => !action.payload.includes(en));
    },
    setScrollTop: (state, action) => {
      state.scrollTop = parseInt(action.payload);
    },
    // search box
    toggleSearchbox: (state, action) => {
      if (action.payload === undefined) {
        state.showSearchbox = !state.showSearchbox;
      } else {
        state.showSearchbox = action.payload;
      }
    },
  },
});

export const {
  toggleShowMobileMenu,
  setBreadcrumbs,
  pushBreadcrumb,
  popBreadcrumb,
  setStyle,
  clearStyle,
  pushClasses,
  popClasses,
  toggleSearchbox,
  setScrollTop,
} = navbarSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export const selectMobileMenuStatus = (state) => state.navbar.showMobileMenu;
export const selectBreadcrumbs = (state) => state.navbar.breadcrumbs;
export const selectStyle = (state) => state.navbar.style;
export const selectClasses = (state) => state.navbar.classes;
export const selectSearchbox = (state) => state.navbar.showSearchbox;
export const selectScrollTop = (state) => state.navbar.scrollTop;

export default navbarSlice.reducer;
