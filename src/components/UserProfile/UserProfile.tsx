import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto bg-black text-white p-6 rounded-lg shadow-lg">
      <Card className="bg-[#161618] text-white border border-[#8080807a] shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <img
              src={user?.imageUrl}
              // alt={user?.username || user?.firstName}
              className="w-24 h-24 rounded-full border-2 border-gray-500"
            />
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{user?.username || user?.firstName}</h2>
              <p className="text-gray-400">{user?.emailAddresses[0]?.emailAddress}</p>
              <p className="text-gray-400">ID: {user?.id}</p>
              <p className="text-gray-400">Joined: {new Date(user?.createdAt || '').toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => navigate('/community')} className="mt-6 bg-purple-800 text-white w-1/4 py-2 rounded-lg hover:bg-purple-900">Back to Chat</Button>
    </div>
  );
};

export default UserProfile;