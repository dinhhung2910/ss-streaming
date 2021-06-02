/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {Fragment, useEffect, useState} from 'react';
import BlankAvatar from '../../../assets/images/blank-profile.png';
import {v4 as uuid} from 'uuid';
import {useResizeDetector} from 'react-resize-detector';
import {useDispatch, useSelector} from 'react-redux';
import {select, selectList, selectUserId} from '../../../features/user/userSlice';
import MutedLink from '../../mutedLink';


/**
 *
 * @return {Component} Topbar dropdown
 */
function TopbarUserDropdown() {
  const [uid, setUid] = useState('');
  const [display, setDisplay] = useState(false);
  const [coor, setCoor] = useState({
    right: 0,
    top: 0,
  });

  const listUser = useSelector(selectList);
  const selectedUserId = useSelector(selectUserId);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = listUser.find((en) => en._id == selectedUserId);
    if (user) {
      setUsername(user.fullname);
    }
  }, [listUser, selectedUserId]);

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
      <div className="header-widget-icon profile-icon cursor-pointer"
        onClick={menuOnclick}
        nav-uuid={uid}
        aria-expanded="false">
        <div className="title">
          {username}
        </div>
        <img src={BlankAvatar} alt=""
          className="header-profile-icon"/>
      </div>
      <TopbarUserDropdownMenu display={display}
        onClose={() => setDisplay(false)}
        coor={coor} uid={uid} />
    </Fragment>
  );
}

// eslint-disable-next-line valid-jsdoc
/**
 * @return {Component} Topbar user dropdown menu
 */
export const TopbarUserDropdownMenu = (props) => {
  const onClose = props.onClose ? props.onClose : () => {};
  const {display, coor, uid} = props;
  const {width, height, ref} = useResizeDetector();
  const listUser = useSelector(selectList);
  const dispatch = useDispatch();

  const selectUser = (id) => {
    dispatch(select(id));
    onClose();
  };

  return (
    <Fragment>
      <div uk-dropdown="pos: top-right ;mode:click"
        dd-uuid={uid}
        ref = {ref}
        className="dropdown-notifications small uk-dropdown uk-dropdown-bottom-right"
        style={{
          display: display ? 'block' : 'none',
          left: coor.right ? (coor.right - width + 'px') : (coor.left + 'px'),
          top: coor.top ? (coor.top + 'px') : (coor.bottom - height + 'px')}}>


        <ul className="dropdown-user-menu">

          {
            listUser.map((en) => (
              <li key={en._id}>
                <MutedLink to="/register" onClick={() => selectUser(en._id)}>
                  <i className="icon-feather-user"></i> {en.fullname}
                </MutedLink>
              </li>
            ))
          }


        </ul>


      </div>

    </Fragment>
  );
};

export default TopbarUserDropdown;
