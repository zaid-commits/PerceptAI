'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, Edit2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [bio, setBio] = useState('AI enthusiast and computer vision researcher')
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating API call
    setTimeout(() => {
      setUpdateStatus('success')
      setIsEditing(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-black"
      >
        <div className="bg-gray-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">User Profile</h2>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
          <div className="flex items-center mb-6">
            <Avatar className="h-24 w-24 mr-4">
              <AvatarImage src="https://github.com/zaid-commits.png" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-semibold text-white">{name}</h3>
              <p className="text-gray-400">{email}</p>
            </div>
          </div>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="bio" className="block text-gray-300 text-sm font-bold mb-2">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-gray-800 text-white w-full p-2 rounded"
                  rows={4}
                />
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save Changes
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <User className="mr-2" size={20} />
                <span>{name}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="mr-2" size={20} />
                <span>{email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Calendar className="mr-2" size={20} />
                <span>Joined: January 2023</span>
              </div>
              <div className="flex items-start text-gray-300">
                <Edit2 className="mr-2 mt-1" size={20} />
                <p>{bio}</p>
              </div>
            </div>
          )}
        </div>
        {updateStatus === 'success' && (
          <Alert className="bg-green-600 text-white">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your profile has been updated successfully!</AlertDescription>
          </Alert>
        )}
        {updateStatus === 'error' && (
          <Alert className="bg-red-600 text-white">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was an error updating your profile. Please try again.</AlertDescription>
          </Alert>
        )}
      </motion.div>
    </div>
  )
}