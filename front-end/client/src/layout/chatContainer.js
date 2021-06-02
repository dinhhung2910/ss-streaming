/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React, {useEffect, useState} from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from '@chatscope/chat-ui-kit-react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../features/user/userSlice';
import {v4 as uuid} from 'uuid';
import MessageSeparator from '@chatscope/chat-ui-kit-react/dist/cjs/MessageSeparator';
import {Button} from '@chatscope/chat-ui-kit-react/dist/cjs/Buttons/Button';
import {
  getMessage,
  selectConversationId,
  selectListConversation,
  selectShowChatbox,
  sendMessage,
  setListMessage,
  selectListMessage,
  setShowChatbox,
  getListConversation,
  setConversationId,
  deleteConversation,
  pushMessage,
} from '../features/conversation/conversationSlice';
import moment from 'moment';
import {Fragment} from 'react';
import ChatboxMenu from './chatboxMenu';
import ChatListMember from './chatListMember';
import {Modal, Button as AntdButton} from 'antd';


/**
 * @param {*} props
 * @return {*}
 */
function ChatFeatureContainer(props) {
  const showChatbox = useSelector(selectShowChatbox);
  const conversationId = useSelector(selectConversationId);
  const listConversation = useSelector(selectListConversation);
  const listMessage = useSelector(selectListMessage);

  const [conversation, setConversation] = useState({});
  const [conversationName, setConversationName] = useState('');
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showListMember, setShowListMember] = useState(false);

  const onSend = props.onSend ? props.onSend : () => {};

  const [scrollTop, setScrollTop] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [elm, setElm] = useState([]);

  useEffect(() => {
    let oldDate = moment([1970, 1, 1]);
    const messageElm = [];

    if (!user) {
      return;
    }

    for (let i = 0; i < listMessage.length; i++) {
      const msg = listMessage[i];
      const date = moment(msg.sendDate).startOf('day');

      if (date > oldDate) {
        oldDate = date;
        messageElm.push((
          <MessageSeparator
            key={uuid()}
            content={moment(date).format('dddd, D MMMM YYYY')} />
        ));
      }

      messageElm.push((
        <Message key={msg._id} model={{
          message: msg.content,
          sentTime: moment(msg.sendDate).format('HH:mm'),
          sender: msg.userId.fullName,
          direction: msg.userId._id == user._id ? 'outgoing' : 'incoming',
        }}>
          <Message.Header sender={msg.userId.fullName}
            sentTime={moment(msg.sendDate).format('HH:mm')} />
        </Message>
      ));
    }

    setElm(messageElm);
  }, [listMessage]);

  useEffect(() => {
    if (conversationId) {
      dispatch(getMessage(conversationId));
      const conv = listConversation.find((en) => en._id == conversationId);
      if (conv) {
        setConversation(conv);
        if (conv.isGroup) {
          setConversationName(conv.name);
        } else {
          const member = conv.members.find((en) => en.userId._id != user._id);
          if (!member) {
            setConversationName('Undefined');
          } else {
            setConversationName(member.userId.fullName);
          }
        }
      }
    }

    return () => {
      dispatch(setListMessage([]));
      setElm([]);
    };
  }, [conversationId]);

  if (!user) {
    return null;
  }


  if (!showChatbox) {
    return null;
  }

  const hideChatbox = () => {
    dispatch(setShowChatbox(false));
  };

  const handleSend = async (content) => {
    // display new message immidiately
    await dispatch(pushMessage({
      conversationId,
      sendDate: new Date(),
      content: content,
      userId: user,
    }));
    await dispatch(sendMessage(conversationId, content));
    onSend();
    dispatch(getMessage(conversationId));
  };

  const onHeaderClick = (e) => {
    const chatboxButtonMore = document.querySelector('.chatbox-button-more');
    const chatboxButtonClose = document.querySelector('.chatbox-button-close');

    if (chatboxButtonClose.contains(e.target)) {
      hideChatbox();
    }
    if (chatboxButtonMore.contains(e.target)) {
      setShowChatMenu(!showChatMenu);
    }
  };

  return (
    <Fragment>
      {
        showChatMenu ? (
          <ChatboxMenu
            onClose={() => setShowChatMenu(false)}
            onShowListMember={() => setShowListMember(true)}
            onDeleteConversation={() => dispatch(deleteConversation(conversationId))}
          />
        ) : null
      }
      {
        showListMember ? (
          <Modal
            visible={showListMember}
            width={600}
            title="List members of conversation"
            onCancel={() => setShowListMember(false)}
            footer={
              [
                (<AntdButton key="back"
                  className="button light"
                  onClick={() => setShowListMember(false)}>
                Return
                </AntdButton>),
              ]
            }
          >
            <ChatListMember
              onStartChat={async (conversationId) => {
                setShowListMember(false);
                await dispatch(getListConversation());
                await dispatch(setConversationId(conversationId));
                await dispatch(getMessage(conversationId));
              }}
            />
          </Modal>
        ) : null
      }
      <div className='conversation-container' style={{bottom: -scrollTop + 'px'}}>
        <ChatContainer>
          <ConversationHeader>
            {/* <Avatar src={emilyIco} name="Emily" /> */}
            <ConversationHeader.Content userName={conversationName} info={''} />
            <ConversationHeader.Actions onClick={onHeaderClick}>
              <div className="chatbox-button-more">
                <Button >
                  <i className="icon-feather-more-vertical" />
                </Button>
              </div>
              <div className="chatbox-button-close">
                <Button >
                  <i className="icon-feather-x" />
                </Button>
              </div>
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            {
              elm.map((en) => en)
            }
          </MessageList>
          <MessageInput
            onSend={handleSend}
            attachButton={false}
            placeholder="Type message here" />
        </ChatContainer>
      </div>

    </Fragment>
  );
}

export default ChatFeatureContainer;
