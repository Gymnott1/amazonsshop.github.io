import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a bot response to: ' + input, user: false },
        ]);
      }, 1000);
    }
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="fixed bottom-4 left-4 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg z-50 dark:bg-orange-500 dark:hover:bg-orange-700"
        style={{ zIndex: 1000 }} // Ensure high z-index
      >
        Chat
      </button>
      {isOpen && (
        <div
          className="fixed bottom-16 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl w-80 max-h-96 overflow-y-auto p-4"
          style={{ zIndex: 999 }} // Ensure high z-index
        >
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${
                  msg.user ? 'text-right bg-gray-200 dark:bg-gray-700' : 'text-left bg-gray-100 dark:bg-gray-900'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow px-4 py-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3 px-5 rounded-r-md dark:bg-orange-500 dark:hover:bg-orange-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
