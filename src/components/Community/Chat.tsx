import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
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

interface ChatNotification {
  type: string;
  message: string;
  timestamp: number;
}

interface User {
  id: string;
  username: string;
  userImageUrl: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [, setOnlineUsers] = useState<User[]>([  //onlineusers
    { id: '1', username: 'Zaid Rakhange', userImageUrl: 'https://github.com/zaid-commits.png' },
    { id: '2', username: 'Adqus Farooqui', userImageUrl: 'https://github.com/zaid-commits.png' },
    { id: '3', username: 'Adyan Shaikh', userImageUrl: 'https://github.com/zaid-commits.png' }
  ]);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) return;

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    socketRef.current = io('http://localhost:5000', {
      query: { userId: user.id, username: user.username ?? user.firstName ?? 'Anonymous' }



      

    });

    socketRef.current.on('chat message', (msg: Message) => {
      setMessages(prevMessages => [...prevMessages, msg]);
      showNotification(msg);
    });

    socketRef.current.on('chat history', (messages: Message[]) => {
      setMessages(messages);
    });

    socketRef.current.on('notification', (notification: ChatNotification) => {
      showChatNotification(notification);
    });

    socketRef.current.on('online users', (users: User[]) => {
      console.log('Online users:', users); // Debugging log
      setOnlineUsers(users);
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
    // Check if permission is granted
    if (Notification.permission === 'granted') {
      console.log('Showing notification:', msg);
      new Notification('PerceptAI', {
        body: 'text' in msg ? msg.text : msg.body,
        icon: 'userImageUrl' in msg ? msg.userImageUrl : '/favicon.ico',
      });
    }
  };

  const showChatNotification = (notification: ChatNotification) => {
    // Check if permission is granted
    if (Notification.permission === 'granted') {
      console.log('Showing chat notification:', notification);
      new Notification('PerceptAI', {
        body: notification.message,
        icon: '/favicon.ico',
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-black text-white flex rounded-lg shadow-lg overflow-hidden">
      <div className="flex-grow">
        <Card className="bg-black text-white border border-gray-700 rounded-lg shadow-md">
          <CardHeader className="bg-black rounded-t-lg">
            <CardTitle className="text-xl font-semibold">PerceptAI ChatRoom</CardTitle>
          </CardHeader>
          <CardContent className="h-96 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {index > 0 && messages[index - 1].userId !== message.userId && (
                  <Separator className="my-4 bg-gray-700" />
                )}
                <div className={`mb-4 ${message.userId === user?.id ? 'flex justify-end' : 'flex justify-start'}`}>
                  <div className={`flex max-w-[80%] ${message.userId === user?.id ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                    <img
                      src={message.userImageUrl}
                      alt={message.username}
                      className="w-10 h-10 rounded-full flex-shrink-0 shadow-md"
                    />
                    <div className={`flex flex-col ${message.userId === user?.id ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-2 rounded-2xl shadow-md ${message.userId === user?.id ? 'bg-purple-800 text-white rounded-br-none' : 'bg-gray-800 text-white rounded-bl-none'}`}>
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
          <CardFooter className="bg-black rounded-b-lg p-4">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-gray-800 text-white rounded-lg shadow-inner"
              />
              <Button type="submit" className="bg-purple-800 text-white rounded-lg shadow-md hover:bg-purple-900">Send</Button>
            </form>
          </CardFooter>
        </Card>
        <Button onClick={() => navigate('/profile')} className="mt-4 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800">Your Profile</Button>
      </div>
      {/* <div className="w-72 bg-black text-white border border-gray-700 ml-6 px-6 py-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Online Users</h2>
        <ul>
          {onlineUsers.map(user => (
            <li key={user.id} className="flex items-center mb-2">
              <img
                src={user.userImageUrl}
                alt={user.username}
                className="w-10 h-10 rounded-full flex-shrink-0 mr-2 shadow-md"
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Chat;

