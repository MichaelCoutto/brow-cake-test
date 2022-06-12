/*
 * Project: frontend
 * File: App.js - Author: Michael Coutto (couttonet@gmail.com)
 * Copyright 2022 Michael Coutto, Solekreative Productions (https://solekreative.com)
 */

import moment from "moment";
import React, { useEffect, useState } from "react";

/**
 * @typedef {Object} MessageProps
 * @property {String} author O Autor
 * @property {String} date A data
 */

/**
 * @param {MessageProps} props 
 * @returns 
 */
const Message = (props) => {
    return (
        <div className="message-line">
            <div className="message-line-header">
                <div className="message-line-header-author">{props.author}</div>
                <div className="message-line-header-postedat">{moment(props.date).fromNow()}</div>
            </div>
            <div className="message-line-message">{props.children}</div>
        </div>
    );
};

const App = (props) => {

    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");

    const listMessages = () => {
        fetch("https://localhost:7065/message/list")
        .then((response) => response.json())
        .then((messagesjson) => {
            setMessageList(messagesjson);
        });
    };

    useEffect(() => {
        listMessages();
    }, []);

    const sendMessage = () => {
        fetch(`https://localhost:7065/message/create?user=${user}&text=${message}`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then((resolve) => {
            listMessages();
            //Limpa a mensagem
            setMessage("");
            setUser("");
        });
    };

    return (
        <div className="message-listing">
            {messageList.map((_line, _key) => (
                <Message key={_key} author={_line.name} date={_line.postedAt}>
                    {_line.text}
                </Message>
            ))}
            <div className="message-post">
                <div className="message-post-textarea">
                    <input type="text" placeholder="Usuário" value={user} onChange={(e) => setUser(e.target.value)} />
                    <textarea value={message} placeholder="Mensagem" onChange={(e) => setMessage(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    )
};

export default App;