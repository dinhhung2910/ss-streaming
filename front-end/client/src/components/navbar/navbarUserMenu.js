import React, {Fragment, useEffect, useState} from 'react';
import {TopbarUserDropdownMenu} from '../PageContainer/topbar/topbarDropdown';
import {v4 as uuid} from 'uuid';

/**
 *
 * @return {Component}
 */
function NavbarUserMenu() {
  const [uid, setUid] = useState('');
  const [display, setDisplay] = useState(false);
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
    e.preventDefault();

    setDisplay(!display);
    const navigation = document.querySelector(`[nav-uuid='${uid}']`);
    setCoor({
      bottom: navigation.offsetHeight + navigation.offsetTop - 6,
      left: 86,
    });
  };

  return (
    <Fragment>
      <a href="/" className="cursor-pointer" onClick={menuOnclick}
        nav-uuid={uid}>
        <span className="icon-feather-user"></span>
      </a>
      <TopbarUserDropdownMenu display={display} coor={coor} uid={uid} />
    </Fragment>
  );
}

export default NavbarUserMenu;
