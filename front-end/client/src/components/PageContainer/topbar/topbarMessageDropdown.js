/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {useResizeDetector} from 'react-resize-detector';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../../features/user/userSlice';
import {Link} from 'react-router-dom';
import {TeacherLinks, UserRole} from '../../../utils/constants';
import MutedLink from '../../mutedLink';
import {getListConversation, selectListConversation, selectUnreadMessage, setConversationId, setConversationStatus, setShowChatbox, setUnreadMessage} from '../../../features/conversation/conversationSlice';
import moment from 'moment';
import BlankAvatar from '../../../assets/images/blank-profile.png';

/**
 *
 * @return {Component} Topbar dropdown
 */
function TopbarMessageDropdown() {
  const [uid, setUid] = useState('');
  const [display, setDisplay] = useState(false);

  const unreadMessage = useSelector(selectUnreadMessage);

  const [coor, setCoor] = useState({
    right: 0,
    top: 0,
  });

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
        nav-uuid={uid}
        className="header-widget-icon" uk-tooltip="title: Message ; pos: bottom ;offset:10" title="" aria-expanded="false">
        <i className="uil-envelope-alt"></i>
        {unreadMessage > 0 ? (<span>{unreadMessage}</span>) : null}
      </MutedLink>
      <TopbarMessageDropdownMenu display={display} coor={coor} uid={uid} onSelect={() => setDisplay(false)} />
    </Fragment>
  );
}

// eslint-disable-next-line valid-jsdoc
/**
 * @return {Component} Topbar user dropdown menu
 */
export const TopbarMessageDropdownMenu = (props) => {
  return null;
};

export default TopbarMessageDropdown;
