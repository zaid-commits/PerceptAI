import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useUser } from '@clerk/clerk-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
interface Message {
  id: string;
  text: string;
  userId: string;
  username: string;
  userImageUrl: string;
  timestamp: number;
}

interface User {
  id: string;
  username: string;
  userImageUrl: string;
}

interface ChatNotification {
  message: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<User[]>([
    { id: "1", username: "zaid-commits", userImageUrl: "https://github.com/zaid-commits.png" },
    { id: "2", username: "maqfa", userImageUrl: "https://th.bing.com/th/id/OIP.8fxcVLYUJsyVEhsXql7PxAHaEK?rs=1&pid=ImgDetMain" },
    { id: "3", username: "adyan", userImageUrl: "https://th.bing.com/th/id/OIP.Gn67FLVSiYsnUaU1g1TgFwHaEK?rs=1&pid=ImgDetMain" },
  ]);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) return;

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socketRef.current = io("http://localhost:5000", {
      query: { userId: user.id, username: user.username ?? user.firstName ?? "Anonymous" },
    });

    socketRef.current.on("chat message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      showNotification(msg);
    });

    socketRef.current.on("chat history", (messages: Message[]) => {
      setMessages(messages);
    });

    socketRef.current.on("notification", (notification: ChatNotification) => {
      showChatNotification(notification);
    });

    socketRef.current.on("online users", (users: User[]) => {
      console.log("Online users:", users); // Debugging log
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
        username: user.username || user.firstName || "Anonymous",
        userImageUrl: (user.publicMetadata as { profileImageUrl?: string }).profileImageUrl || user.imageUrl || "",
        timestamp: Date.now(),
      };

      socketRef.current.emit("chat message", newMessage);
      setInputValue("");
    }
  };

  const showNotification = (msg: Message | Notification) => {
    if (Notification.permission === "granted") {
      console.log("Showing notification:", msg);
      new Notification("PerceptAI", {
        body: "text" in msg ? msg.text : msg.body,
        icon: "userImageUrl" in msg ? msg.userImageUrl : "/favicon.ico",
      });
    }
  };

  const showChatNotification = (notification: ChatNotification) => {
    if (Notification.permission === "granted") {
      console.log("Showing chat notification:", notification);
      new Notification("PerceptAI", {
        body: notification.message,
        icon: "/favicon.ico",
      });
    }
  };

  return (
    <div className="w-full h-[100vh] overflow-hidden fixed bg-black text-white flex">
      {/* Chat Window */}
      <div className="flex-grow flex flex-col">
        <Card className="bg-[#0c0c0c] text-white border border-gray-800 rounded-none shadow-lg h-full flex flex-col">
          <CardHeader className="bg-[#0c0c0c] border-b border-gray-800">
            <CardTitle className="text-2xl font-bold">PerceptAI ChatRoom</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6">
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                {index > 0 && messages[index - 1].userId !== message.userId && (
                  <Separator className="my-4 bg-gray-800" />
                )}
                <div
                  className={`mb-4 ${message.userId === user?.id ? "flex justify-end" : "flex justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${message.userId === user?.id ? "flex-row-reverse" : "flex-row"} items-end gap-2`}
                  >
                    <Avatar
                      className="w-10 h-10 rounded-full flex-shrink-0 shadow-md cursor-pointer relative"
                      onClick={() => navigate(`/profile/${message.userId}`)}
                    >
                      <AvatarImage src={message.userImageUrl} alt={message.username} />
                      <AvatarFallback>{message.username[0]}</AvatarFallback>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0c0c0c] rounded-full translate-x-1/2 translate-y-1/2"></span>
                    </Avatar>
                    <div
                      className={`flex flex-col ${message.userId === user?.id ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl shadow-md ${message.userId === user?.id ? "bg-purple-800 text-white rounded-br-none" : "bg-gray-800 text-white rounded-bl-none"}`}
                      >
                        <p className="font-bold text-sm">{message.username}</p>
                        <p className="break-words">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-2">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="bg-black  border-t border-gray-800 p-4">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-black text-white rounded-lg shadow-inner focus:ring-2 focus:ring-purple-600"
              />
              <Button
                type="submit"
                className="bg-purple-800 text-white rounded-lg shadow-md hover:bg-purple-900 transition-colors"
              >
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      {/* Online Users Sidebar */}
      <div className="w-72 bg-[#0c0c0c] text-white border-l border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Online Users</h2>
        <ul className="space-y-4">
          {onlineUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition-colors"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <Avatar className="w-10 h-10 rounded-full flex-shrink-0 mr-2 shadow-md relative">
                <AvatarImage src={user.userImageUrl} alt={user.username} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
                <span className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 border-2 border-[#0c0c0c] rounded-full"></span>
              </Avatar>
              <span className="font-medium">{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
