/* eslint-disable max-len */
import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectClasses} from '../../../features/navbar/navbarSlice';
import Breadcrumbs from './breadcrumbs';
import TopbarUserDropdown from './topbarDropdown';
import TopbarMessageDropdown from './topbarMessageDropdown';
import TopbarNotificationDropdown from './topbarNotificationDropdown';

/**
 *
 * @return {Component} topbar
 */
function TopBar() {
  const classes = useSelector(selectClasses);

  return (
    <div id="topbar" className={classes.join(' ')}>
      <Breadcrumbs />

      <div className="header-widget">

        <Link className="uk-navbar-toggle uk-visible@s uk-hidden@l"
          uk-toggle="target: .nav-overlay; animation: uk-animation-fade"
          to="/home">
          <i className="uil-search icon-small"></i>
        </Link>

        <Link to="/home" className="header-widget-icon"
          uk-tooltip="title: My Courses ; pos: bottom ;offset:10"
          title="" aria-expanded="false">
          <i className="uil-youtube-alt"></i>
        </Link>


        <div uk-dropdown="pos: top-right;mode:click;animation: uk-animation-slide-bottom-small"
          className="dropdown-notifications my-courses-dropdown uk-dropdown uk-dropdown-bottom-right"
          style={{left: '907.2px', top: '46px'}}>


          <div className="dropdown-notifications-headline">
            <h4>Your Courses</h4>
            <Link to="/home">
              <i className="icon-feather-settings" uk-tooltip="title: Notifications settings ; pos: left" title="" aria-expanded="false"></i>
            </Link>
          </div>


          <div className="dropdown-notifications-content" data-simplebar="init">
            <div className="simplebar-wrapper" style={{margin: '0px'}}>
              <div className="simplebar-height-auto-observer-wrapper">
                <div className="simplebar-height-auto-observer"></div>
              </div>
              <div className="simplebar-mask">
                <div className="simplebar-offset" style={{right: '0px', bottom: '0px'}}>
                  <div className="simplebar-content" style={{padding: '0px', height: 'auto', overflow: 'hidden'}}>
                    <ul>
                      <li className="notifications-not-read">
                        <a href="course-intro.html">
                          <span className="notification-image">
                            <img src="./dashboard_files/3.png" alt=""/> </span>
                          <span className="notification-text">
                            <span className="course-title">The Complete JavaScript Course Build Real
                                                Projects </span>
                            <span className="course-number">8/25 </span>
                            <span className="course-progressbar">
                              <span className="course-progressbar-filler" style={{width: '95%'}}></span>
                            </span>
                          </span>


                          <span className="btn-option" aria-expanded="false">
                            <i className="icon-feather-more-vertical"></i>
                          </span>
                          <div className="dropdown-option-nav uk-dropdown" uk-dropdown="pos: bottom-right ;mode : hover">
                            <ul>
                              <li>
                                <span>
                                  <i className="icon-material-outline-dashboard"></i>
                                                        Course Dashboard</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-video"></i>
                                                        Resume Course</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-x"></i>
                                                        Remove Course</span>
                              </li>
                            </ul>
                          </div>

                        </a>
                      </li>
                      <li>
                        <a href="course-intro.html">
                          <span className="notification-image">
                            <img src="./dashboard_files/1.png" alt=""/> </span>
                          <span className="notification-text">
                            <span className="course-title">Ultimate Web Designer &amp; Web Developer
                            </span>
                            <span className="course-number">6/35 </span>
                            <span className="course-progressbar">
                              <span className="course-progressbar-filler" style={{width: '95%'}}></span>
                            </span>
                          </span>


                          <span className="btn-option" aria-expanded="false">
                            <i className="icon-feather-more-vertical"></i>
                          </span>
                          <div className="dropdown-option-nav uk-dropdown" uk-dropdown="pos: bottom-right ;mode : hover">
                            <ul>
                              <li>
                                <span>
                                  <i className="icon-material-outline-dashboard"></i>
                                                        Course Dashboard</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-video"></i>
                                                        Resume Course</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-x"></i>
                                                        Remove Course</span>
                              </li>
                            </ul>
                          </div>
                        </a>

                      </li>
                      <li>
                        <a href="course-intro.html">
                          <span className="notification-image">
                            <img src="./dashboard_files/2.png" alt=""/> </span>
                          <span className="notification-text">
                            <span className="course-title"> Angular Fundamentals From The Beginning</span>
                            <span className="course-number">6/35 </span>
                            <span className="course-progressbar">
                              <span className="course-progressbar-filler" style={{width: '95%'}}></span>
                            </span>
                          </span>


                          <span className="btn-option" aria-expanded="false">
                            <i className="icon-feather-more-vertical"></i>
                          </span>
                          <div className="dropdown-option-nav uk-dropdown" uk-dropdown="pos: bottom-right ;mode : hover">
                            <ul>
                              <li>
                                <span>
                                  <i className="icon-material-outline-dashboard"></i>
                                                        Course Dashboard</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-video"></i>
                                                        Resume Course</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-x"></i>
                                                        Remove Course</span>
                              </li>
                            </ul>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="course-intro.html">
                          <span className="notification-image">
                            <img src="./dashboard_files/3.png" alt=""/> </span>
                          <span className="notification-text">
                            <span className="course-title">The Complete JavaScript Course Build Real
                                                Projects </span>
                            <span className="course-number">8/25 </span>
                            <span className="course-progressbar">
                              <span className="course-progressbar-filler" style={{width: '95%'}}></span>
                            </span>
                          </span>


                          <span className="btn-option" aria-expanded="false">
                            <i className="icon-feather-more-vertical"></i>
                          </span>
                          <div className="dropdown-option-nav uk-dropdown" uk-dropdown="pos: bottom-right ;mode : hover">
                            <ul>
                              <li>
                                <span>
                                  <i className="icon-material-outline-dashboard"></i>
                                                        Course Dashboard</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-video"></i>
                                                        Resume Course</span>
                              </li>
                              <li>
                                <span>
                                  <i className="icon-feather-x"></i>
                                                        Remove Course</span>
                              </li>
                            </ul>
                          </div>

                        </a>
                      </li>
                    </ul>

                  </div>
                </div>
              </div>
              <div className="simplebar-placeholder" style={{width: '0px', height: '0px'}}>
              </div>
            </div>
            <div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}>
              <div className="simplebar-scrollbar" style={{transform: 'translate3d(0px, 0px, 0px)', visibility: 'hidden'}}>
              </div>
            </div>
            <div className="simplebar-track simplebar-vertical" style={{visibility: 'hidden'}}>
              <div className="simplebar-scrollbar" style={{height: '247px', transform: 'translate3d(0px, 0px, 0px)', visibility: 'hidden'}}>
              </div>
            </div>
          </div>
          <div className="dropdown-notifications-footer">
            <a href="dashboard.html#"> sell all</a>
          </div>
        </div>


        <TopbarNotificationDropdown />
        <TopbarMessageDropdown />
        <TopbarUserDropdown />
      </div>

    </div>
  );
}

export default TopBar;
