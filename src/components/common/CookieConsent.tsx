import React, { useState, useEffect } from 'react';
import { Shield, Settings2, Check, X } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('apex_cookie_consent');
      if (!stored) {
        // Small delay so page loads cleanly without blocking
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem('apex_cookie_consent', JSON.stringify(prefs));
    } catch (e) {
      console.error(e);
    }
    setPreferences(prefs);
    setIsVisible(false);
    setIsPreferencesOpen(false);

    // Architectural hook: analytics initialization gated on consent
    if (prefs.analytics && typeof window !== 'undefined') {
      (window as any).__ANALYTICS_INITIALIZED__ = true;
    }
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectOptional = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md">
        {!isPreferencesOpen ? (
          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  Privacy & Cookie Preferences
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We use cookies to maintain secure sessions and analyze platform telemetry. You have the right to accept or decline optional cookies.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white font-medium rounded-xl transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleRejectOptional}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-colors cursor-pointer"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(true)}
                className="px-3 py-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs underline cursor-pointer ml-auto"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-900 dark:text-white">
                Cookie Categories
              </span>
              <button
                onClick={() => setIsPreferencesOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Necessary (Required)</div>
                  <div className="text-[11px] text-slate-500">Security tokens, authentication state, and basic navigation.</div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700">Always Active</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Analytics</div>
                  <div className="text-[11px] text-slate-500">Anonymized telemetry to evaluate system performance and route latency.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Marketing & Attribution</div>
                  <div className="text-[11px] text-slate-500">Measures the effectiveness of technical webinars and content referrals.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
