/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {Fragment} from 'react';
import MutedLink from '../components/mutedLink';

/**
 *
 * @param {*} props
 * @return {*}
 */
function ChatboxMenu(props) {
  const onClose = (typeof props.onClose == 'function') ? props.onClose : () => {};
  const onShowListMember = (typeof props.onShowListMember == 'function') ? props.onShowListMember : () => {};
  const onDeleteConversation = (typeof props.onDeleteConversation == 'function') ? props.onDeleteConversation : () => {};

  const handleClickoutside = (e) => {
    const chatBoxMenu = document.querySelector('.chatbox-menu');
    if (chatBoxMenu && !chatBoxMenu.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickoutside);

    return () => document.removeEventListener('click', handleClickoutside);
  }, []);

  return (
    <Fragment>
      <div uk-dropdown="pos: top-right ;mode:click"
        className="dropdown-notifications small uk-dropdown uk-dropdown-bottom-right chatbox-menu"
        style={{
          display: 'block',
          right: '50px',
          bottom: '370px',
          zIndex: '1021',
        }}
      >


        <ul className="dropdown-user-menu">

          <li><MutedLink href="/login" onClick={() => {
            onClose();
            onShowListMember();
          }}>
            <i className="icon-feather-user"></i> List members</MutedLink>
          </li>
          <li><MutedLink href="/register" style={{color: '#ff4d4f'}} onClick={() => {
            onClose();
            if (confirm('Are you sure you want to delete this conversation?')) {
              onDeleteConversation();
            }
          }}>
            <i className="icon-feather-trash"></i>Delete this conversation</MutedLink>
          </li>

        </ul>


      </div>

    </Fragment>
  );
}

export default ChatboxMenu;
