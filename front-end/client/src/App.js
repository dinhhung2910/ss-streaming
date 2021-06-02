/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// styles
import './styles/app.scss';

import Navbar from './components/navbar/navbar';
import TopBar from './components/PageContainer/topbar/topbar';
import MobileNavbar from './components/PageContainer/mobileNavbar';
import {useDispatch, useSelector} from 'react-redux';
import {loadList as loadUser, selectUserLoading} from './features/user/userSlice';
import Loading from './components/loading';
import Home from './pages/home';
import {selectStyle} from './features/navbar/navbarSlice';
import {getAllCategories} from './features/category/categorySlice';
import {loadListProduct} from './features/products/productSlice';

/**
 *
 * @return {Component} App
 */
function App() {
  const dispatch = useDispatch();
  const wrapperStyle = useSelector(selectStyle);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllCategories());
    dispatch(loadListProduct());
  }, []);

  const userLoading = useSelector(selectUserLoading);
  if (userLoading) {
    return <Loading />;
  }


  return (
    <Fragment>
      <ToastContainer autoClose={5000} />
      <Router>
        <Fragment>
          <div id="wrapper"
            style={wrapperStyle}
          >
            <MobileNavbar />
            <Navbar />
            <div className="page-content">
              <TopBar />
              <Switch>
                <Route exact path="/" component={Home}></Route>
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    </Fragment>
  );
}

export default App;
