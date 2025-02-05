'use client';

import { useEffect, useState, useRef } from 'react';
import ChatHeader from "../molecules/ChatHeader"
import MessageList from "../molecules/MessageList"
import InputField from "../atoms/InputField"
import ChatButton from "../atoms/ChatButton"
import { assignUser, fetchConversations, sendMessage as apiSendMessage } from "../../services/chatService"


type Message = {
  id: string;
  role: 'user' | 'indicator' | 'bot';
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // On mount, check localStorage or assign new user.
  useEffect(() => {
    const storedUser = localStorage.getItem('chat_user_id');
    if (storedUser) {
      setUserId(storedUser);
      fetchConversations(storedUser).then((conversations) => setMessages(conversations));
    } else {
      assignUser().then((data) => {
        if (data.user_id) {
          setUserId(data.user_id);
          localStorage.setItem('chat_user_id', data.user_id);
        }
      });
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || !userId) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input.trim() };

    // Add user message and a typing indicator.
    setMessages((prev) => [...prev, userMessage, { id: 'indicator', role: 'indicator', content: 'Bot is typing...' }]);
    setInput('');

    try {
      const botContent = await apiSendMessage(userId, userMessage.content, (partialContent) => {
        // Update partial content if desired.
        setMessages((prev) =>
          prev.map((msg) => (msg.id === 'bot_temp' ? { ...msg, content: partialContent } : msg))
        );
      });

      // Replace typing indicator with the final bot message.
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== 'indicator' && msg.id !== 'bot_temp').concat({
          id: Date.now().toString(),
          role: 'bot',
          content: botContent,
        })
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <ChatButton onClick={() => setOpen(!open)} icon="💬" />
      {open && (
        <div className="fixed bottom-20 right-4 w-2/5 h-1/2 bg-white border border-gray-200 rounded-lg shadow-xl flex flex-col overflow-hidden">
          <ChatHeader title="Chatbot" onClose={() => setOpen(false)} />
          <MessageList messages={messages} />
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-black font-semibold text-lg pb-3">Hello! How can I help you today?</h3>
            {/* Additional quick action buttons can be added here */}
            <InputField
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
}
