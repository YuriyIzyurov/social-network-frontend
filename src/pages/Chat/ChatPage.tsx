import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startChatListening, stopChatListening} from "../../redux/chatReducer";
import {AppDispatch, AppStateType, useAppDispatch} from "../../redux/reduxStore";
import {AnyAction} from "redux";



export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <Chat />
}

const Chat: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        debugger
            dispatch(startChatListening()).then(() => console.log('1'))
        return () => {
            dispatch(stopChatListening()).then(() => console.log('2'))
        }
    },[])

    return <div>
        <Messages />
        <AddChatMessageForm />
    </div>
}
const Messages: React.FC<{}> = ({}) => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m,index) => <Message key={index} message={m}/>)}
    </div>
}
const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: '40px'}}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}
const AddChatMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setStatus] = useState<'pending'|'ready'>('pending')

    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        if(!message) return
        dispatch(sendMessage(message)).then(() => console.log('3'))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage