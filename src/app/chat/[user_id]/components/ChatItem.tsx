import React, { useState } from 'react';

interface Message {
  sender: 'user' | 'system'; // กำหนดว่าใครเป็นผู้ส่งข้อความ
  content: string;            // ข้อความ
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewUserMessage = (newMessage: string) => {
    console.log('Received message:', newMessage);

    const userMessage: Message = {
      sender: 'user',
      content: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const systemReply: Message = {
      sender: 'system',
      content: `System reply: You said "${newMessage}"`,
    };
    setMessages((prevMessages) => [...prevMessages, systemReply]);
  };

  // ตัวอย่างข้อความเริ่มต้นจากระบบ
  const initializeChat = () => {
    const systemMessage: Message = {
      sender: 'system',
      content: 'Hello! How can I assist you today?',
    };
    setMessages([systemMessage]);
  };

  // เรียกใช้งาน initializeChat เมื่อ component ถูกโหลดครั้งแรก
  React.useEffect(() => {
    initializeChat();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chat with Support</h2>
      
      {/* แสดงข้อความที่ส่งมาจากทั้งระบบและผู้ใช้ */}
      <div style={{ maxHeight: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div
              style={{
                backgroundColor: message.sender === 'user' ? '#cfe9ff' : '#f1f1f1',
                borderRadius: '5px',
                padding: '10px',
                textAlign: message.sender === 'user' ? 'right' : 'left',
              }}
            >
              <strong>{message.sender === 'user' ? 'You' : 'System'}:</strong>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Widget สำหรับแชท */}
]
    </div>
  );
};

export default ChatComponent;
