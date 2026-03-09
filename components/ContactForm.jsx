'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function ContactForm() {

  // Form field states
  const [name, setName] =               useState('')
  const [familyName, setFamilyName] =   useState('')
  const [email, setEmail] =             useState('')
  const [message, setMessage] =         useState('')

  // Submission states
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess]     = useState(false)
  const [error, setError]         = useState('')

  function launchConfetti() {
    // Get the Y position of the bottom of the hero strip
    const heroBottom = document.querySelector('.hero-strip')?.getBoundingClientRect().bottom ?? 300
    const originY = heroBottom / window.innerHeight

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { x: 0.5, y: originY },
      gravity: 1.2,
      ticks: 200,
      colors: ['#2563EB', '#60A5FA', '#BFDBFE', '#ffffff', '#1E40AF'],
      scalar: 0.9,
      drift: 0.1,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()     // stops browser from refreshing the page
    setIsLoading(true)     // show loading state on button
    setError('')           // clear any previous error

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          familyName,
          email,
          message
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)       // show success message
        launchConfetti()    // fire confetti on success
        setName('')        // clear the form
        setFamilyName('') 
        setEmail('')
        setMessage('')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }

    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)    // always stop loading whether success or fail
    }
  }

  // Show success message after submission
  if (success) {
    
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✔️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Message Sent!
        </h2>
        <p className="text-gray-500 mb-6">
          Thank you for reaching out. We will get back to you soon.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 hover:scale-105 disabled:bg-blue-300 disabled:scale-100 text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* NAME */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="John"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Family Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Family Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Smith"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* MESSAGE */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* SUBMIT */}
        <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 hover:scale-105 disabled:bg-blue-300 disabled:scale-100 text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
        >
        {isLoading ? (
            <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending...
            </>
        ) : (
            'Send Message'
        )}
        </button>

    </form>
  )
}