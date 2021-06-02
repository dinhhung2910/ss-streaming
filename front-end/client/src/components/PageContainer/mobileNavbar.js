/* eslint-disable max-len */
import React from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {toggleShowMobileMenu} from '../../features/navbar/navbarSlice';

/**
 *
 * @return {Component} Mobile navbar
 */
function MobileNavbar() {
  const dispatch = useDispatch();

  const toggleMenu = (e) => {
    dispatch(toggleShowMobileMenu());
  };

  return (
    <div className="mobile-header nav-overlay">
      <span className="btn-mobile cursor-pointer"
        onClick = {toggleMenu}
        uk-toggle="target: #wrapper ; cls: mobile-active">
      </span>
      <Link to="/home" className="logo">
        <i className=" uil-graduation-hat"></i> Courseplus
      </Link>
      <div className="uk-flex">
        <a className="uk-navbar-toggle" uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="dashboard.html#">
          <i className="uil-search icon-small"></i>
        </a>
        <span className="uil-user icon-small" uk-toggle="target: .header-widget ; cls: is-active">
        </span></div>
    </div>
  );
}

export default MobileNavbar;
