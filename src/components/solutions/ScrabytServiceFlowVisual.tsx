import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Cpu,
  FileText,
  FileCheck2,
  Receipt,
  CalendarCheck,
  TrendingUp,
  ArrowDown,
  Sparkles,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface ScrabytServiceFlowVisualProps {
  interactive?: boolean;
}

export const ScrabytServiceFlowVisual: React.FC<ScrabytServiceFlowVisualProps> = ({
  interactive = true,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'conversation',
      label: 'Clinical Conversation',
      icon: MessageSquare,
      accent: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900',
      badge: 'Step 01 · Ambient Audio Stream',
      syntheticSample: 'Dr: "Patient reports recurrent tension headaches for 3 weeks, aggravated by screen fatigue."',
      detail: 'Multi-speaker acoustic ingestion and medical-lexicon speech decomposition.',
    },
    {
      id: 'ai-layer',
      label: 'AI Intelligence Layer',
      icon: Cpu,
      accent: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-900',
      badge: 'Step 02 · Clinical LLM Inference',
      syntheticSample: '[Entity Extraction]: ICD-10 Candidate G44.209 · Symptom duration: 21 days · Red flags: Negative',
      detail: 'Zero-retention medical reasoning models extracting structured clinical facts.',
    },
    {
      id: 'documentation',
      label: 'Structured Documentation',
      icon: FileText,
      accent: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900',
      badge: 'Step 03 · Longitudinal Record',
      syntheticSample: 'SOAP Note auto-compiled: Subjective, Objective, Assessment & Care Plan draft ready for clinician sign-off.',
      detail: 'EMR-ready structured notes formatted in real time with provenance citations.',
    },
    {
      id: 'prescriptions',
      label: 'Prescription Workflow',
      icon: FileCheck2,
      accent: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900',
      badge: 'Step 04 · Medication Verification',
      syntheticSample: 'Draft: Ibuprofen 400mg q8h PRN · Interaction check: Zero contraindications found in active profile.',
      detail: 'Clinician-in-the-loop validation with automated drug interaction screening.',
    },
    {
      id: 'billing',
      label: 'Billing Workflow',
      icon: Receipt,
      accent: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900',
      badge: 'Step 05 · Revenue Cycle Intelligence',
      syntheticSample: 'CPT 99213 / E&M Level 3 cross-checked against clinical documentation complexity rules.',
      detail: 'Autonomous code matching preventing denial claims and downstream revenue friction.',
    },
    {
      id: 'follow-up',
      label: 'Patient Follow-up',
      icon: CalendarCheck,
      accent: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-900',
      badge: 'Step 06 · Continuity of Care',
      syntheticSample: 'Follow-up appointment scheduled for +14 days. Patient instructions generated in clear language.',
      detail: 'Automated post-encounter check-ins and personalized self-care guidance.',
    },
    {
      id: 'operational',
      label: 'Operational Intelligence',
      icon: TrendingUp,
      accent: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-900',
      badge: 'Step 07 · Clinic Performance Optimization',
      syntheticSample: 'Clinic Throughput: Encounter turnaround -28 min · Zero backlog in daily pending notes ledger.',
      detail: 'Aggregate clinic-wide telemetry for staffing optimization, wait-time reduction, and compliance oversight.',
    },
  ];

  // Subtle auto-step cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="w-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-8 shadow-xl space-y-6">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Scrabyt AI as a Service Pipeline Architecture
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Synthetic Demonstration · Zero Protected Data
        </span>
      </div>

      {/* Grid of Steps (Desktop & Tablet) / Vertical Flow on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 relative">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                isActive
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 shadow-md ring-1 ring-blue-500/20'
                  : 'border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${step.accent}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {step.label}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{isActive ? 'Active' : 'Inspect'}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Real-time Synthetic Output Panel */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 text-white font-mono border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400 font-semibold">{steps[activeStep].badge}</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Pipeline Stage {activeStep + 1} of {steps.length}
          </span>
        </div>

        {/* Synthetic Terminal Output */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
          <div className="text-slate-500 text-[10px] uppercase mb-1">Synthetic Runtime Output:</div>
          <p className="text-emerald-400 text-xs sm:text-[13px]">{steps[activeStep].syntheticSample}</p>
        </div>

        {/* Step Context explanation */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>{steps[activeStep].detail}</span>
          <span className="text-slate-500 font-sans hidden sm:inline">Automatic progression active</span>
        </div>
      </div>
    </div>
  );
};
