import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Tab = 'signup' | 'login'
type Mode = Tab | 'forgot'

export default function AuthPage() {
  const { signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState<Mode>(location.pathname === '/login' ? 'login' : 'signup')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [signupDone, setSignupDone] = useState(false)

  function switchTab(tab: Tab) {
    setMode(tab)
    setMessage(null)
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters.' })
      return
    }
    if (password !== confirm) {
      setMessage({ type: 'error', text: 'Passwords do not match.' })
      return
    }

    setLoading(true)
    const err = await signUp(email, password, fullName)
    setLoading(false)

    if (err) {
      setMessage({ type: 'error', text: err })
    } else {
      setSignupDone(true)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    const err = await signIn(email, password)
    setLoading(false)
    if (err) { setMessage({ type: 'error', text: err }); return }
    navigate('/')
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    const err = await resetPassword(email)
    setLoading(false)
    if (err) {
      setMessage({ type: 'error', text: err })
    } else {
      setMessage({ type: 'success', text: 'Check your email — we sent a password reset link.' })
    }
  }

  if (signupDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-sm w-full text-center space-y-4">
          <div className="text-4xl">✉️</div>
          <h2 className="text-xl font-bold text-slate-900">Check your email</h2>
          <p className="text-sm text-slate-500">
            We sent a confirmation link to <strong>{email}</strong>.<br />
            Click it to activate your account, then come back to sign in.
          </p>
          <button
            onClick={() => { setSignupDone(false); switchTab('login') }}
            className="inline-block mt-2 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
          >
            Go to sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">MORE English</p>
          <h1 className="text-2xl font-bold text-slate-900">Real Listening Course</h1>
          <p className="mt-1 text-sm text-slate-500">
            {mode === 'signup' ? 'Join the course' : mode === 'login' ? 'Sign in to continue' : 'Reset your password'}
          </p>
        </div>

        {mode !== 'forgot' && (
          <div className="flex bg-slate-100 rounded-xl p-1 mb-4">
            <button
              type="button"
              onClick={() => switchTab('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                mode === 'signup' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => switchTab('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
                mode === 'login' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sign in
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
                <input
                  type="text" required value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Anna Petrova"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password" required minLength={8} value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm password</label>
                <input
                  type="password" required value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Repeat your password"
                />
              </div>

              <p className="text-xs text-slate-400">
                🔒 Your password is stored securely and is never visible to anyone, including your teacher.
              </p>

              {message && (
                <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                  {message.text}
                </p>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
              >
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setMessage(null) }}
                    className="text-xs text-teal-600 hover:text-teal-800"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="••••••••"
                />
              </div>
              {message && (
                <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                  {message.text}
                </p>
              )}
              <button
                type="submit" disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          )}

          {mode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your email address</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="you@example.com"
                />
              </div>
              {message && (
                <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                  {message.text}
                </p>
              )}
              <button
                type="submit" disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setMessage(null) }}
                className="w-full text-sm text-slate-500 hover:text-slate-700"
              >
                ← Back to sign in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
