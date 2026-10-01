import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Check, ArrowRight, User, Sparkles } from 'lucide-react';
import { leadService } from '../../services/leadService';

export const LeadChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    businessProblem: '',
    finalPath: '',
  });

  const [inputVal, setInputVal] = useState('');

  const interestOptions = [
    'AI Agents',
    'AI as a Service',
    'SaaS',
    'Custom AI',
    'Consulting',
    'Something else',
  ];

  const finalPaths = [
    'Book a Demo',
    'Talk to an AI Expert',
    'Request Consultation',
    'Contact Sales',
  ];

  const handleSelectInterest = (opt: string) => {
    setLeadData((prev) => ({ ...prev, interest: opt }));
    setStep(1); // move to asking business problem
  };

  const handleSendProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setLeadData((prev) => ({ ...prev, businessProblem: inputVal }));
    setInputVal('');
    setStep(2); // move to contact info
  };

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email || !leadData.company) return;
    setStep(3); // move to path selection
  };

  const handleSelectFinalPath = (path: string) => {
    const finalRecord = {
      ...leadData,
      finalPath: path,
    };

    leadService.saveLead({
      name: finalRecord.name,
      email: finalRecord.email,
      phone: finalRecord.phone,
      company: finalRecord.company,
      lead_source: 'Chatbot',
      landing_page: window.location.pathname,
      interest: finalRecord.interest,
      business_problem: `[${path}] ${finalRecord.businessProblem}`,
    });

    setStep(4); // success
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open AI solution navigator"
          className="p-3.5 bg-slate-900 hover:bg-blue-600 dark:bg-white dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-2xl shadow-xl flex items-center gap-2.5 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 group"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <span className="hidden sm:inline text-xs font-semibold pr-1">
            Explore Solutions
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[560px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Solution Navigator</div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Systems triage active
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Body */}
          <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
            {/* Initial opening message */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed max-w-[85%]">
                Looking at AI for your business? I can help you find the right starting point across our infrastructure and autonomous agents.
              </div>
            </div>

            {/* Step 0: Interest selection */}
            {step === 0 && (
              <div className="space-y-2 pt-1 pl-8">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Which domain interests you?
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {interestOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectInterest(opt)}
                      className="p-2 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 text-xs font-medium transition-all cursor-pointer truncate"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Business Problem input */}
            {step >= 1 && (
              <>
                <div className="flex justify-end">
                  <div className="p-2.5 rounded-2xl bg-blue-600 text-white text-xs max-w-[85%]">
                    Interested in: {leadData.interest}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed max-w-[85%]">
                    What operational problem or bottleneck are you aiming to solve?
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <form onSubmit={handleSendProblem} className="pt-2 pl-8 flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="e.g. Automate invoice verification or customer queue triage"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Step 2: Contact Form in-chat */}
            {step >= 2 && (
              <>
                <div className="flex justify-end">
                  <div className="p-2.5 rounded-2xl bg-blue-600 text-white text-xs max-w-[85%]">
                    {leadData.businessProblem}
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed max-w-[85%]">
                    Got it. Who should our systems engineering team route the technical recommendations to?
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <form onSubmit={handleSendContact} className="pt-2 pl-8 space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email *"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="Company Name *"
                  value={leadData.company}
                  onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
                <input
                  type="tel"
                  placeholder="Phone (Optional)"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Continue
                </button>
              </form>
            )}

            {/* Step 3: Choose Final Action Path */}
            {step === 3 && (
              <div className="space-y-2 pt-2 pl-8">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  How would you prefer to proceed?
                </div>
                <div className="space-y-1.5">
                  {finalPaths.map((path) => (
                    <button
                      key={path}
                      onClick={() => handleSelectFinalPath(path)}
                      className="w-full p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{path}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Complete */}
            {step === 4 && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Request Routed Successfully
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                  Thank you, {leadData.name}. Your details have been submitted to our Systems Solutions group under action path: <span className="font-mono font-semibold">{leadData.finalPath}</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
