import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function GetFeatured({ onClose }) {
  
  const mountedRef = useRef(true);
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    story: ''
  });

  const [loading, setLoading] = useState(false);

  // ✅ SINGLE safe close path
  const safeClose = () => {
    if (!loading) onClose();
  };

  const handleSubmit = async () => {
    console.log('[GetFeatured] handleSubmit clicked');
    if (loading) return;

    if (!form.email) {
      alert('Email is required.');
      return;
    }

    setLoading(true);

    // hard-timeout so the UI never gets stuck indefinitely
    // 1) request abort timeout (best-effort)
    const timeoutMs = 20000;
    const controller = new AbortController();

    // 2) UI loading timeout (guaranteed) — ensures `loading` clears after 20s
    let didTimeout = false;
    const loadingTimeoutId = setTimeout(() => {
      didTimeout = true;
      if (mountedRef.current) setLoading(false);
      alert(`Request timed out after ${timeoutMs / 1000}s.`);
    }, timeoutMs);

    // best-effort abort the network request too
    const abortTimeoutId = setTimeout(() => {
      try {
        controller.abort();
      } catch {
        // no-op
      }
    }, timeoutMs);

    try {
      console.log('[GetFeatured] submitting form:', form);

      // Build the query. If the client supports abortSignal, attach it.
      let query = supabase
        .from('get_featured')
        .insert([form])

      if (typeof query.abortSignal === 'function') {
        query = query.abortSignal(controller.signal);
      }

      // Force execution (important for thenable-style builders)
      const { data, error } = await query.then((r) => r);

      clearTimeout(loadingTimeoutId);
      clearTimeout(abortTimeoutId);

      console.log('[GetFeatured] response:', { data, error });

      if (error) throw error;

      alert('Submission received. We will be in touch soon.');

      // defer unmount to avoid abort
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (err) {
      // If something aborted the request, surface it clearly during debugging
      console.error('[GetFeatured] submit failed:', err);
      if (err?.name === 'AbortError') {
        // If our UI timeout already fired, don't double-alert.
        if (!didTimeout) {
          alert(`Request timed out after ${timeoutMs / 1000}s.`);
        }
        return;
      }

      const msg =
        err?.message ||
        err?.details ||
        (typeof err === 'string' ? err : JSON.stringify(err, null, 2));

      alert(msg);
    } finally {
      try {
        clearTimeout(loadingTimeoutId);
        clearTimeout(abortTimeoutId);
      } catch {
        // no-op
      }
      // avoid setState on unmounted component; if the timeout already fired,
      // it already cleared loading and alerted.
      if (mountedRef.current && !didTimeout) setLoading(false);
    }
  };

  return (
    <div
      className="waitlist-overlay"
      onClick={safeClose}
    >
      <div
        className="waitlist-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="waitlist-close"
          disabled={loading}
          onClick={safeClose}
        >
          ✕
        </button>

        <h2>Get Featured</h2>
        <p>Share your story and get featured on Real Africa.</p>

        <div className="waitlist-field">
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="waitlist-field">
          <label>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="waitlist-field">
          <label>Company / Venture</label>
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div className="waitlist-field">
          <label>What makes you exceptional?</label>
          <textarea
            rows="5"
            value={form.story}
            onChange={(e) => setForm({ ...form, story: e.target.value })}
          />
        </div>

        <div className="waitlist-actions">
          <button
            type="button"
            className="waitlist-cancel"
            disabled={loading}
            onClick={safeClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="waitlist-submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Submitting… Please wait' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}