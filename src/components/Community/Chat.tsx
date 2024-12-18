import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import io, { Socket } from 'socket.io-client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  text: string;
  userId: string;
  username: string;
  userImageUrl: string;
  timestamp: number;
}

interface Notification {
  type: string;
  message: string;
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

    socketRef.current = io('https://ts-backend-6swe.onrender.com', {
      query: { userId: user.id, username: user.username || user.firstName || 'Anonymous' }
    });

    socketRef.current.on('chat message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
      showNotification(msg);
    });

    socketRef.current.on('chat history', (messages: Message[]) => {
      setMessages(messages);
    });

    socketRef.current.on('notification', (notification: Notification) => {
      showNotification(notification);
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
        userImageUrl: (user.publicMetadata as { profileImageUrl?: string }).profileImageUrl || user.imageUrl || '',
        timestamp: Date.now()
      };

      socketRef.current.emit('chat message', newMessage);
      setInputValue('');
    }
  };

  const showNotification = (msg: Message | Notification) => {
    if (Notification.permission === 'granted') {
      new Notification('PerceptAI', {
        body: 'text' in msg ? msg.text : msg.message,
        icon: 'userImageUrl' in msg ? msg.userImageUrl : '/favicon.ico',
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto bg-black text-white">
      <CardHeader>
        <CardTitle>PerceptAI ChatRoom</CardTitle>
      </CardHeader>
      <CardContent className="h-96 overflow-y-auto">
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            {index > 0 && messages[index - 1].userId !== message.userId && (
              <Separator className="my-4 bg-purple-800/20" />
            )}
            <div className={`mb-4 ${message.userId === user?.id ? 'flex justify-end' : 'flex justify-start'}`}>
              <div className={`flex max-w-[80%] ${message.userId === user?.id ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <img
                  src={message.userImageUrl}
                  alt={message.username}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div
                  className={`flex flex-col ${message.userId === user?.id ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl ${message.userId === user?.id ? 'bg-purple-800 text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}`}
                  >
                    <p className="font-bold text-sm">{message.username}</p>
                    <p className="break-words">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 px-2">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
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