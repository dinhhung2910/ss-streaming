/* eslint-disable max-len */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectListCategory} from '../../features/category/categorySlice';
import {toggleSearchbox} from '../../features/navbar/navbarSlice';
import {PublicLinks} from '../../utils/constants';
import MutedLink from '../mutedLink';
import NavbarUserMenu from './navbarUserMenu';

/**
 *
 * @return {Component}
 */
function Navbar() {
  const dispatch = useDispatch();

  const listCategory = useSelector(selectListCategory);
  const link = 'yummy';

  return (
    <div className="side-nav uk-animation-slide-left-medium">

      <div className="side-nav-bg"></div>

      {/* Logo */}
      <div className="logo uk-visible@s">
        <Link to="/home">
          <i className=" uil-graduation-hat"></i>
        </Link>
      </div>

      <ul>
        <li>
          <MutedLink to={link}>
            <i className="uil-youtube-alt"></i>
            <span className="tooltips"> My courses</span>
          </MutedLink>
        </li>
        <li>
          <MutedLink to={link}>
            <i className="uil-rss-interface"></i>
            <span className="tooltips"> My lessons</span>
          </MutedLink>
        </li>
        <li>
          <MutedLink to={link}>
            <i className="uil-file-alt"></i>
            <span className="tooltips">My assignments</span>
          </MutedLink>
        </li>
        <li>
          <MutedLink to={PublicLinks.LIST_CATEGORIES}>
            <i className="uil-layers"></i>
          </MutedLink>
          <div className="side-menu-slide">
            <div className="side-menu-slide-content">
              <ul data-simplebar="init"><div className="simplebar-wrapper" style={{margin: '0px'}}>
                <div className="simplebar-height-auto-observer-wrapper">
                  <div className="simplebar-height-auto-observer"></div>
                </div>
                <div className="simplebar-mask">
                  <div className="simplebar-offset" style={{right: '-17px', bottom: '0px;'}}>
                    <div className="simplebar-content" style={{padding: '0px', height: '100%', overflow: 'hidden scroll'}}>
                      {
                        listCategory.map((en) => (
                          <li key={en._id}>
                            <MutedLink to={'/category/' + en._id}>
                              <i className={en.icon}></i> {en.name}
                            </MutedLink>
                          </li>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="simplebar-placeholder" style={{width: '230px', height: '772px'}}>
                </div>
              </div>
              <div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}>
                <div className="simplebar-scrollbar" style={{transform: 'translate3d(0px, 0px, 0px)', visibility: 'hidden'}}>
                </div></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}>
                <div className="simplebar-scrollbar" style={{height: '666px', transform: 'translate3d(0px, 0px, 0px)', visibility: 'visible'}}>
                </div>
              </div>
              </ul>
            </div>
          </div>
        </li>

        <li>
          <MutedLink href="#" onClick={() => dispatch(toggleSearchbox())}>
            <i className="uil-search-alt"></i>
          </MutedLink>
        </li>

      </ul>
      <ul className="uk-position-bottom">

        <li>
          <NavbarUserMenu />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
