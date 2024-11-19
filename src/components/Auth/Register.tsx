'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import logo from '../../../public/logo.jpg'

export default function Registration() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating API call
    setTimeout(() => {
      if (password === confirmPassword) {
        setRegistrationStatus('success')
      } else {
        setRegistrationStatus('error')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Logo" className="w-32 h-32" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Register</h2>
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
              placeholder="Enter your name"
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
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <Label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 text-white pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <Label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-800 text-white"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </Button>
          </div>
        </form>
        {registrationStatus === 'success' && (
          <Alert className="bg-green-600 text-white">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your account has been created successfully!</AlertDescription>
          </Alert>
        )}
        {registrationStatus === 'error' && (
          <Alert className="bg-red-600 text-white">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Passwords do not match. Please try again.</AlertDescription>
          </Alert>
        )}
      </motion.div>
    </div>
  )
}