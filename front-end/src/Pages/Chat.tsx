import React, { useEffect, useState } from 'react'
import { fetchChat } from '../Services/AdminServices';


function Chat() {

    const [chats, setChats] = useState<any[]>([]);

    const fetchChats = async () => {

        const {data} = await fetchChat();

console.log("=====",data);
        setChats(data);
    }

    useEffect(() => {
        fetchChats();

    }, [])
// console.log(chats,"chats");

    return (
        <div>{chats && chats.map((chat) => <div key={chat._id}>{chat.chatName}</div>)}</div>
    )
}

export default Chat