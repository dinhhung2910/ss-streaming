/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import BlankAvatar from '../../../assets/images/blank-profile.png';
import {v4 as uuid} from 'uuid';
import {useResizeDetector} from 'react-resize-detector';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../../features/user/userSlice';
import {Link} from 'react-router-dom';
import {MessageType, NotificationTag, StudentLinks, TeacherLinks, UserRole} from '../../../utils/constants';
import MutedLink from '../../mutedLink';
import {getListNotification, markNotificationAsRead, pushNotification, selectListNotification, selectUnreadNotification} from '../../../features/notification/notificationSlice';
import {} from '../../../utils/constants';
import Moment from 'react-moment';
import moment from 'moment';

/**
 *
 * @return {Component} Topbar dropdown
 */
function TopbarNotificationDropdown() {
  const [uid, setUid] = useState('');
  const [display, setDisplay] = useState(false);
  const [coor, setCoor] = useState({
    right: 0,
    top: 0,
  });

  const unreadNotification = useSelector(selectUnreadNotification);

  useEffect(() => {
    const _uid = uuid();
    setUid(_uid);

    /**
     *
     * @param {*} event
     */
    const handleClickOutside = (event) => {
      const menu = document.querySelector(`[dd-uuid='${_uid}']`);
      const navigation = document.querySelector(`[nav-uuid='${_uid}']`);

      if (navigation && navigation.contains(event.target)) {
        return;
      }

      if (menu && !menu.contains(event.target)) {
        setDisplay(false);
      } else {
        let t = event.target;
        while (t) {
          if (t.classList.contains('close-menu')) {
            setDisplay(false);
            break;
          } else {
            t = t.parentElement;
          }
        }
      }
    };

    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const menuOnclick = (e) => {
    setDisplay(!display);
    const navigation = document.querySelector(`[nav-uuid='${uid}']`);
    setCoor({
      top: navigation.offsetTop + navigation.offsetHeight,
      right: navigation.offsetLeft + navigation.offsetWidth,
    });
  };

  return (
    <Fragment>
      <MutedLink href="dashboard.html#"
        className="header-widget-icon"
        nav-uuid={uid}
        title="" aria-expanded="false">
        <i className="uil-bell"></i>
        {unreadNotification ? (<span>{unreadNotification}</span>) : null}

      </MutedLink>
      <TopbarNotificationDropdownMenu
        onClose={() => {
          setDisplay(false);
        }}
        display={display} coor={coor} uid={uid} />
    </Fragment>
  );
}

// eslint-disable-next-line valid-jsdoc
/**
 * @return {Component} Topbar user dropdown menu
 */
export const TopbarNotificationDropdownMenu = (props) => {
  const dispatch = useDispatch();
  const onClose = (typeof props.onClose === 'function') ? props.onClose : () => {};

  const {display, coor, uid} = props;
  const {width, height, ref} = useResizeDetector();
  // const user = useSelector(selectUser);

  const list = useSelector(selectListNotification);

  useEffect(() => {
    dispatch(getListNotification());
  }, []);

  useEffect(() => {
    const handler = (e) => {
      dispatch(pushNotification(e.detail));
      dispatch(getListNotification());
    };

    document.addEventListener(MessageType.NOTIFICATION, handler);

    return () => document.removeEventListener(MessageType.NOTIFICATION, handler);
  }, []);

  const clickItem = async (id) => {
    await dispatch(markNotificationAsRead(id));
    onClose();
    await dispatch(getListNotification());
  };

  return (
    <Fragment>

      <div uk-dropdown="pos: top-right ;mode:click"
        dd-uuid={uid}
        ref = {ref}
        className="dropdown-notifications uk-dropdown uk-dropdown-bottom-right"
        style={{
          display: display ? 'block' : 'none',
          left: coor.right ? (coor.right - width + 'px') : (coor.left + 'px'),
          top: coor.top ? (coor.top + 'px') : (coor.bottom - height + 'px')}}>
        <div className="dropdown-notifications-headline">
          <h4>Notifications </h4>
          <MutedLink href="dashboard.html#">
            <i className="icon-feather-settings"
              uk-tooltip="title: Notifications settings ; pos: left" title=""
              aria-expanded="false"></i>
          </MutedLink>
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
                    {
                      list.map((en) => {
                        return (
                          <li key={en._id}
                            onClick={() => clickItem(en._id)}
                            className={en.isRead ? '' : 'notifications-not-read'}>
                            {toNotificationElm(en)}
                          </li>
                        );
                      })
                    }

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
            <div className="simplebar-scrollbar" style={{height: '232px', transform: 'translate3d(0px, 0px, 0px)', visibility: 'hidden'}}>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const toNotificationElm = (data) => {
  const clone = Object.assign({}, data);
  data.addtionalInfo.forEach((en) => {
    Object.assign(clone, {
      [en.key]: en.value,
    });
  });

  switch (clone.tag) {
    case NotificationTag.LESSON.START_MEETING:
      return (
        <Link to={StudentLinks.LESSON_DETAIL + '/' + clone.objectId}>
          <span className="notification-icon button soft-success disabled">
            <i className="icon-feather-play"></i></span>
          <span className="notification-text">
            Lesson <strong>{clone.name}</strong> has started.
            <br />
            <span className="time-ago">
              <Moment fromNow={true}>
                {moment(clone.lastUpdate)}
              </Moment>
            </span>
          </span>
        </Link>
      );
  }
};

export default TopbarNotificationDropdown;
