import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PasswordInput from '../components/PasswordInput'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  // Supabase's automatic hash-detection can race with the router on first load,
  // so parse the recovery tokens from the URL and set the session explicitly.
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1))
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ error }) => {
        if (error) setMessage({ type: 'error', text: error.message })
        setReady(true)
        history.replaceState(null, '', window.location.pathname)
      })
    } else {
      supabase.auth.getSession().then(({ data }) => {
        if (!data.session) {
          setMessage({ type: 'error', text: 'This reset link is invalid or has expired. Request a new one from the sign-in page.' })
        }
        setReady(true)
      })
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
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
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Password updated! Redirecting…' })
      setTimeout(() => navigate('/'), 1500)
    }
  }

  if (!ready) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">Loading…</div>
  }

  const linkInvalid = message?.type === 'error' && message.text.includes('invalid or has expired')

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">MORE English</p>
          <h1 className="text-2xl font-bold text-slate-900">Set a new password</h1>
        </div>

        <form onSubmit={handleSubmit} className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4 ${linkInvalid ? 'opacity-50 pointer-events-none' : ''}`}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">New password</label>
            <PasswordInput
              required minLength={8} value={password}
              onChange={setPassword}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm new password</label>
            <PasswordInput
              required value={confirm}
              onChange={setConfirm}
              placeholder="Repeat your password"
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
            {loading ? 'Saving…' : 'Save new password'}
          </button>
        </form>

        {linkInvalid && (
          <button
            onClick={() => navigate('/login')}
            className="w-full mt-4 text-sm text-teal-600 hover:text-teal-800"
          >
            ← Back to sign in
          </button>
        )}
      </div>
    </div>
  )
}
