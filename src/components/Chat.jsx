import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import "../App.css";

const ChatPage = () => {
  const [messages, setMessages] = useState({
    "John Doe": [{ text: "Hi there!", sender: "other" }],
    "Alice Smith": [{ text: "Hey!", sender: "other" }],
    "Bob Johnson": [{ text: "Hello!", sender: "other" }],
  });

  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeChat, setActiveChat] = useState("John Doe");
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [userName, setUserName] = useState("User Name");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [isEditing, setIsEditing] = useState(false);

  const members = [
    { name: "John Doe", email: "john@example.com", img: "/images/alex.png" },
    { name: "Alice Smith", email: "alice@example.com", img: "/images/bob.png" },
    { name: "Bob Johnson", email: "bob@example.com", img: "/images/joy.png" },
  ];

  useEffect(() => {
    setFilteredMembers(
      members.filter((member) =>
        member.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const sendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeChat]: [...(prevMessages[activeChat] || []), { text: inputText, sender: "me" }],
      }));
      setInputText("");
    }
  };

  const handleSelectUser = (member) => {
    setActiveChat(member.name);
    setSearchText("");
  };

  return (
    <div className="chat-page">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="profile-section">
          <img src="/images/woman.png" alt="Profile" className="profilee-pic" />
          {isEditing ? (
            <>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="edit-input"
              />
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="edit-input"
              />
              <button onClick={() => setIsEditing(false)}>Save</button>
            </>
          ) : (
            <>
              <h3>{userName}</h3>
              <p>{userEmail}</p>
            </>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search People"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Members List */}
        <ul className="members-list">
          {filteredMembers.map((member) => (
            <li key={member.name} onClick={() => handleSelectUser(member)}>
              <div className="member-item">
                <img
                  src={member.img}
                  alt={`${member.name} profile`}
                  className="member-pic"
                />
                <div className="chat-info">
                  <h4>{member.name}</h4>
                  <p>{member.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <img
            src={
              members.find((m) => m.name === activeChat)?.img ||
              "/images/alex.png"
            }
            alt="Profile"
            className="chat-header-pic"
          />
          <h3>{activeChat}</h3>
        </div>

        <div className="chat-messages">
          {messages[activeChat]?.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
