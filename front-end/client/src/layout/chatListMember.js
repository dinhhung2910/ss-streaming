/* eslint-disable max-len */
import {Button} from 'antd';
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDirectConversationId,
  selectConversationId,
  selectListConversation,
} from '../features/conversation/conversationSlice';
import {selectUser} from '../features/user/userSlice';

/**
 *
 * @param {*} props
 * @return {*}
 */
function ChatListMember(props) {
  const onStartChat = (typeof props.onStartChat == 'function') ? props.onStartChat : () => {};

  const [members, setMembers] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const listConversation = useSelector(selectListConversation);
  const conversationId = useSelector(selectConversationId);

  const startDirectChat = async (id) => {
    const conversation = await dispatch(getDirectConversationId(id));
    onStartChat(conversation._id);
  };

  useEffect(() => {
    const conversation = listConversation.find((en) => en._id == conversationId);
    if (conversation && conversation.members) {
      setMembers(conversation.members);
    }

    return () => setMembers([]);
  }, [conversationId, listConversation]);

  if (!user) {
    return null;
  }

  return (
    <Fragment>
      <table className="uk-table uk-table-striped">
        <tbody>
          {members.map((en) => (
            <tr key={en.userId._id}>
              <td>{en.userId.fullName}</td>
              <td>
                {
                  (en.userId._id == user._id) ? null : (
                    <Button className="button grey" onClick={() => startDirectChat(en.userId._id)}>
                      <i className="icon-feather-message-circle" />&ensp;{'Chat'}
                    </Button>
                  )
                }

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>

  );
}

export default ChatListMember;
