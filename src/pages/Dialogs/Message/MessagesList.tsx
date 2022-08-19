import React, {Dispatch, SetStateAction, useEffect, useMemo, useRef, useState} from 'react';
import Message from "pages/Dialogs/Message/Message";
import {useSelector} from "react-redux";
import {getAuthID} from "redux/auth-selectors";
import {getAuthAvatar} from "redux/profile-selectors";
import {getMessageList} from "redux/dialog-selectors";
import {DialogType} from "typings/types";
import { Empty } from 'antd';

type PropsType = {
    dialogs: DialogType[]
    id: number | null
    setMessageSending: Dispatch<SetStateAction<boolean>>
    isMessageSending: boolean
}
export const MessagesList: React.FC<PropsType> = React.memo(({dialogs, id, setMessageSending, isMessageSending}) => {

    const isMe = useSelector(getAuthID)
    const authAvatar = useSelector(getAuthAvatar)
    const messageList = useSelector(getMessageList)
    const recipientAvatar = dialogs.find(elem => elem.id === id)?.photos.small
    const messagesRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
            messagesRef.current?.scrollIntoView(
                {
                    behavior: isMessageSending ? 'smooth' :'auto',
                    block: 'end',
                    inline: 'nearest'
                })
    })

    useEffect(() => {
            setMessageSending(false)
    },[id])

    if(messageList.length === 0) {
        return <Empty  className="chat__dialog-messages-empty" description="Нет сообщений"/>
    }
    return (
        <>
            {messageList.map((m) => <Message key={m.id}
                                             message={m.body}
                                             avatar={m.senderId === isMe ? authAvatar : recipientAvatar}
                                             date={m.addedAt}
                                             isMe={m.senderId === isMe}
                                             viewed={m.senderId !== isMe ? true : m.viewed}
            />)}
            <div ref={messagesRef}></div>
        </>
    );
})
