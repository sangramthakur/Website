import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Download, Mail, RefreshCw, BarChart2, ShieldAlert, Sparkles, FileText, Check } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, calculateReadiness } from '../../data/assessmentQuestions';
import { AssessmentResultData } from '../../types';
import { leadService } from '../../services/leadService';

export const AssessmentWizard: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AssessmentResultData | null>(null);

  // Lead Capture State
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
  });
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const currentQuestion = ASSESSMENT_QUESTIONS[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / ASSESSMENT_QUESTIONS.length) * 100);

  const handleSelectOption = (score: number) => {
    const updated = { ...answers, [currentQuestion.id]: score };
    setAnswers(updated);

    if (currentIdx < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate results immediately without gating
      const computed = calculateReadiness(updated);
      setResult(computed);
    }
  };

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !leadForm.company) return;

    if (result) {
      leadService.saveLead({
        name: leadForm.name,
        email: leadForm.email,
        company: leadForm.company,
        job_title: leadForm.role,
        phone: leadForm.phone,
        lead_source: 'AI Readiness Assessment',
        landing_page: '/resources/ai-readiness-assessment',
        interest: 'Full Assessment Report',
        business_problem: `Maturity: ${result.maturityLevel} (Score: ${result.overallScore}/100)`,
        assessment_score: result.overallScore,
        assessment_categories: result.categoryScores,
      });
    }

    setReportUnlocked(true);
  };

  const handleDownloadReport = () => {
    // Generates a clean text / markdown export representing the formal executive report
    if (!result) return;
    const content = `ENTERPRISE AI READINESS EXECUTIVE REPORT
==================================================
Organization: ${leadForm.company || 'Enterprise Candidate'}
Lead: ${leadForm.name || 'Executive Stakeholder'} (${leadForm.role || 'Leadership'})
Generated: ${new Date().toLocaleDateString()}
Maturity Classification: ${result.maturityLevel.toUpperCase()}

OVERALL SCORE: ${result.overallScore} / 100

CATEGORY BREAKDOWN:
- Strategy & Investment: ${result.categoryScores.Strategy}%
- Data Architecture & Vector Readiness: ${result.categoryScores.Data}%
- Infrastructure & MLOps Tooling: ${result.categoryScores.Technology}%
- Process Standardization: ${result.categoryScores.Processes}%
- Organizational Enablement: ${result.categoryScores.People}%
- Zero-Trust Governance & Firewalls: ${result.categoryScores.Governance}%

DIRECTIONAL INTERPRETATION:
${result.interpretation}

STRATEGIC STRENGTHS:
${result.strengths.map((s) => `• ${s}`).join('\n')}

OPERATIONAL GAPS TO ADDRESS:
${result.gaps.map((g) => `• ${g}`).join('\n')}

RECOMMENDED NEXT ACTIONS (PRIORITY MATRIX):
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Note: This is a directional readiness evaluation based on platform heuristics.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-Readiness-Report-${(leadForm.company || 'Enterprise').replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setResult(null);
    setReportUnlocked(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!result ? (
        /* WIZARD QUESTION VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in duration-200">
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                Category: {currentQuestion.category}
              </span>
              <span>
                Question {currentIdx + 1} of {ASSESSMENT_QUESTIONS.length} ({progressPercent}%)
              </span>
            </div>
            {/* Visual Progress Bar */}
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Current Question */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              {currentQuestion.question}
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Select the option that most honestly reflects your current enterprise posture.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.score;

              return (
                <button
                  key={option.score}
                  onClick={() => handleSelectOption(option.score)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-slate-900 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-semibold">{option.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {option.explanation}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Question</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Immediate directional score generated on completion
            </span>
          </div>
        </div>
      ) : (
        /* RESULT VIEW: Immediate Free Score Display + Lead Capture for Full Report */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Main Score Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  Readiness Score Generated
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Operational Maturity: {result.maturityLevel}
                </h2>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
                  {result.overallScore}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
              </div>
            </div>

            {/* Free Initial Interpretation */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Directional Architectural Interpretation
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {result.interpretation}
              </p>
              <div className="text-[11px] font-mono text-slate-500 pt-1">
                * Note: This is a directional capability benchmark intended for planning, not a formal third-party compliance audit.
              </div>
            </div>

            {/* Category Breakdown Charts */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                Category Maturity Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(result.categoryScores).map(([cat, score]) => (
                  <div
                    key={cat}
                    className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                      <span>{cat}</span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-start">
              <button
                onClick={handleReset}
                className="text-xs font-mono text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Assessment
              </button>
            </div>
          </div>

          {/* LEAD CAPTURE: Expanded Report Access */}
          {!reportUnlocked ? (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                  Comprehensive Deliverable
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                  Get Your Full AI Readiness Report
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Unlock the full executive summary, prioritized risk gaps, recommended AI use cases, and an architectural priority matrix for your engineering team.
                </p>
              </div>

              <form onSubmit={handleLeadCapture} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="alex.m@enterprise.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Company *</label>
                    <input
                      type="text"
                      required
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      placeholder="Enterprise Group Ltd"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Role / Title</label>
                    <input
                      type="text"
                      value={leadForm.role}
                      onChange={(e) => setLeadForm({ ...leadForm, role: e.target.value })}
                      placeholder="VP of Engineering / CTO"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <span>Unlock Full AI Readiness Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* UNLOCKED FULL REPORT VIEW (Section 18) */
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    Executive Deliverable Unlocked
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Full AI Readiness Diagnostic & Priority Matrix
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Prepared for {leadForm.name} · {leadForm.company}
                  </div>
                </div>

                {/* PDF & Email Actions */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>

                  <button
                    onClick={() => setEmailSent(true)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{emailSent ? 'Dispatched' : 'Email My Report'}</span>
                  </button>
                </div>
              </div>

              {/* Strengths & Gaps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/60 space-y-3">
                  <div className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    Demonstrated Capabilities & Strengths
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {result.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60 space-y-3">
                  <div className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    Infrastructure & Operational Gaps
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {result.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Priority Matrix & Recommended Next Actions */}
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Priority Implementation Sequence
                </div>
                <div className="space-y-2.5">
                  {result.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 flex items-start gap-3 bg-slate-50/50 dark:bg-slate-900/40"
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        0{i + 1}
                      </span>
                      <div className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {rec}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-blue-900 dark:text-blue-200">
                  Would you like our engineering team to review this diagnostic in an architectural discovery session?
                </div>
                <button
                  onClick={() => alert('Our solutions team has been notified and will review your diagnostic.')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer"
                >
                  Request Architecture Discussion
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
