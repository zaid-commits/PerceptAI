'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulating API call
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        setLoginStatus('success')
      } else {
        setLoginStatus('error')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>
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
          <div className="mb-6 relative">
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
          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </Button>
            <a className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-400" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        {loginStatus === 'success' && (
          <Alert className="bg-green-600 text-white">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>You have successfully logged in!</AlertDescription>
          </Alert>
        )}
        {loginStatus === 'error' && (
          <Alert className="bg-red-600 text-white">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Invalid email or password. Please try again.</AlertDescription>
          </Alert>
        )}
      </motion.div>
    </div>
  )
}