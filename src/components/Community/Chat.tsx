import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import io, { Socket } from 'socket.io-client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface Message {
  id: string;
  text: string;
  userId: string;
  username: string;
  timestamp: number;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    socketRef.current = io('http://localhost:5000', {
      query: { userId: user.id, username: user.username || user.firstName || 'Anonymous' }
    });

    socketRef.current.on('chat message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue && socketRef.current && user) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        userId: user.id,
        username: user.username || user.firstName || 'Anonymous',
        timestamp: Date.now()
      };
      socketRef.current.emit('chat message', newMessage);
      setInputValue('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white">
      <CardHeader>
        <CardTitle>PerceptAI ChatRoom</CardTitle>
      </CardHeader>
      <CardContent className="h-96 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-2 ${message.userId === user?.id ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block px-3 py-2 rounded-lg ${
                message.userId === user?.id ? 'bg-purple-800 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              <p className="font-bold text-sm">{message.username}</p>
              <p>{message.text}</p>
              <p className="text-xs opacity-50">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-800 text-white"
          />
          <Button type="submit" className="bg-purple-800 text-white">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
