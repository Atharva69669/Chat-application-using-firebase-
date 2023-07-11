import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import './Chat.css'
import { collection, addDoc, where, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";


const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const flush = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => flush();
  }, [messagesRef,room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Welcome to room: {room}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (

          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="message-input"
            placeholder="Type your message here...."
          />
          <button type="submit" className="sendButton">
            Send
          </button>
        </form>
      </div>

    </div>
  );
};

export default Chat;
