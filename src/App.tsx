import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking')
  const [detail, setDetail] = useState('')

  useEffect(() => {
    // Simple connectivity check: ask Supabase for the current auth session.
    // This succeeds as soon as the client is configured correctly.
    supabase.auth
      .getSession()
      .then(({ error }) => {
        if (error) {
          setStatus('error')
          setDetail(error.message)
        } else {
          setStatus('ok')
        }
      })
      .catch((e: unknown) => {
        setStatus('error')
        setDetail(e instanceof Error ? e.message : String(e))
      })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-500">
          MORE English
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">
          Real Listening Course
        </h1>
        <p className="mt-3 max-w-md text-slate-500">
          Train your ear to decode connected speech — elisions, linking, glottal
          stops, and weak forms.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm shadow-sm">
        {status === 'checking' && (
          <span className="text-slate-500">Checking Supabase connection…</span>
        )}
        {status === 'ok' && (
          <span className="text-emerald-600">✓ Supabase connected</span>
        )}
        {status === 'error' && (
          <span className="text-red-600">
            ✗ Supabase error: {detail || 'unknown'}
          </span>
        )}
      </div>
    </div>
  )
}

export default App
