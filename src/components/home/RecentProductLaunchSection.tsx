import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Cpu,
  FileText,
  FileCheck2,
  Receipt,
  CalendarCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Activity,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Video,
} from 'lucide-react';
import { trackEvent, trackScrabytExternalClick } from '../../services/analytics';

interface RecentProductLaunchSectionProps {
  onNavigate: (href: string) => void;
}

export const RecentProductLaunchSection: React.FC<RecentProductLaunchSectionProps> = ({
  onNavigate,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'pipeline'>('video');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Track view event
  useEffect(() => {
    trackEvent('recent_product_launch_view', {
      product: 'Scrabyt',
      category: 'AI as a Service',
      source_page: 'homepage',
      source_section: 'recent_product_launch',
    });
  }, []);

  // Workflow steps for the lightweight animated conceptual visualization
  const workflowNodes = [
    {
      id: 'conversation',
      name: 'Clinical Conversation',
      icon: MessageSquare,
      status: 'Captured',
      sample: 'Multi-party ambient clinical dialog stream',
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: 'ai-intelligence',
      name: 'AI Intelligence',
      icon: Cpu,
      status: 'Inferred',
      sample: 'Zero-retention medical reasoning & fact extraction',
      color: 'text-cyan-500 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/60',
    },
    {
      id: 'documentation',
      name: 'Documentation',
      icon: FileText,
      status: 'Synthesized',
      sample: 'Structured SOAP note draft with citation trace',
      color: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      id: 'prescription',
      name: 'Prescription',
      icon: FileCheck2,
      status: 'Verified',
      sample: 'Medication order verified with clinician sign-off',
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      id: 'billing',
      name: 'Billing',
      icon: Receipt,
      status: 'Processed',
      sample: 'Deterministic CPT/E&M code alignment',
      color: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'follow-up',
      name: 'Follow-up',
      icon: CalendarCheck,
      status: 'Scheduled',
      sample: 'Patient discharge instructions & interval check-in',
      color: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/60',
    },
    {
      id: 'operational-intelligence',
      name: 'Operational Intelligence',
      icon: TrendingUp,
      status: 'Optimized',
      sample: 'Clinic throughput & turnaround analytics',
      color: 'text-violet-500 dark:text-violet-400',
      bgColor: 'bg-violet-50 dark:bg-violet-950/60',
    },
  ];

  // Automatic interval animation removed per user request: static/manual inspection and video demo placeholder
  const capabilityChips = [
    'Clinical Intelligence',
    'AI Documentation',
    'Workflow Automation',
    'Healthcare Operations',
    'Billing Workflows',
    'Patient Follow-up',
  ];

  const handleExternalClick = () => {
    trackEvent('scrabyt_homepage_launch_click', {
      product: 'Scrabyt',
      category: 'AI as a Service',
      destination: 'https://www.scrabyt.com/',
      source_page: 'homepage',
      source_section: 'recent_product_launch',
    });
    trackScrabytExternalClick('homepage', 'recent_product_launch');
  };

  const handleSecondaryClick = () => {
    trackEvent('scrabyt_aiaas_click', {
      source_page: 'homepage',
      source_section: 'recent_product_launch',
      destination: '/solutions/ai-as-a-service',
    });
    onNavigate('/solutions/ai-as-a-service');
  };

  return (
    <section
      id="recent-product-launch"
      aria-label="Recent Product Launch: Scrabyt"
      className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-slate-50/90 via-white to-slate-50/60 dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 border-y border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Subtle ambient lighting accent (restrained blue & cyan) */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT SIDE: Launch Info & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow & Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-900/60 text-xs font-mono font-bold tracking-wider text-blue-700 dark:text-blue-300 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                RECENT PRODUCT LAUNCH
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                LIVE
              </span>
            </div>

            {/* Product Identity */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  SCRABYT
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                  <span>Clinical Intelligence OS</span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-500 dark:text-slate-400">AI as a Service</span>
                </div>
              </div>

              {/* Semantic H2 Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                AI-powered clinical intelligence for modern healthcare.
              </h2>
            </div>

            {/* Concise Product Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Scrabyt is an AI-powered clinical intelligence platform that connects clinical conversations with documentation, prescriptions, billing workflows, follow-ups and operational intelligence.
            </p>

            {/* Key Capability Chips (4-6 chips) */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Core Capabilities:
              </div>
              <div className="flex flex-wrap gap-2">
                {capabilityChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop CTAs (On mobile, this appears below the animation as requested in Section 19) */}
            <div className="hidden sm:flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.scrabyt.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore Scrabyt website — opens in a new tab"
                onClick={handleExternalClick}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
              >
                <span>Explore Scrabyt</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={handleSecondaryClick}
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:underline cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <span>Learn about our AI as a Service offerings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Video Demo Placeholder & Interactive Workflow */}
          <div className="lg:col-span-6 space-y-4">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeTab === 'video'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-blue-500" />
                  <span>Video Walkthrough</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
                    activeTab === 'pipeline'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Interactive Pipeline</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                4K · Sub-500ms SLA
              </span>
            </div>

            {/* TAB 1: VIDEO PLACEHOLDER */}
            {activeTab === 'video' ? (
              <div className="relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden group select-none">
                <div className="relative aspect-video w-full overflow-hidden flex flex-col justify-between bg-slate-950">
                  {/* Poster Screen */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950 p-4 sm:p-5 flex flex-col justify-between">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        <span className="ml-1 text-[11px] font-mono text-slate-400 truncate">
                          scrabyt-clinical-intelligence-demo.mp4
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        02:15
                      </span>
                    </div>

                    {/* Poster Body Wireframe Preview */}
                    <div className="grid grid-cols-2 gap-3 my-auto opacity-40 group-hover:opacity-60 transition-opacity">
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] font-mono text-blue-400">Ambient Scribe</div>
                        <div className="text-xs font-bold text-white">Multi-Party Dialog Stream</div>
                        <div className="text-[10px] text-slate-400 font-mono">Zero PHI Retention</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[10px] font-mono text-emerald-400">Deterministic Billing</div>
                        <div className="text-xs font-bold text-white">E&M / CPT Code Alignment</div>
                        <div className="text-[10px] text-slate-400 font-mono">100% Audit Verified</div>
                      </div>
                    </div>
                  </div>

                  {/* Big Play Button Overlay */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsVideoModalOpen(true);
                        setIsVideoPlaying(true);
                      }}
                      aria-label="Play Scrabyt Clinical Intelligence Demo Video"
                      className="group/btn relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                    >
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 transition-transform group-hover/btn:scale-110" />
                    </button>
                    <div className="mt-3.5 space-y-0.5">
                      <div className="text-sm font-bold text-white tracking-tight flex items-center justify-center gap-2">
                        <span>Watch Scrabyt Clinical Demo</span>
                        <span className="text-[10px] font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800/60">
                          2m 15s
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 max-w-xs">
                        From ambient clinical conversation to verified SOAP notes and billing codes.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="relative z-10 p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsVideoModalOpen(true);
                          setIsVideoPlaying(true);
                        }}
                        className="hover:text-white transition-colors cursor-pointer"
                        aria-label="Play demo video"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-white transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <span className="font-mono text-[10px] text-slate-400">00:32 / 02:15</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                        1080p HD
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsVideoModalOpen(true);
                          setIsVideoPlaying(true);
                        }}
                        className="hover:text-white transition-colors cursor-pointer"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate">Production Walkthrough · Clinical Intelligence OS</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsVideoModalOpen(true);
                      setIsVideoPlaying(true);
                    }}
                    className="text-blue-400 hover:text-blue-300 font-mono text-[11px] font-semibold shrink-0 cursor-pointer"
                  >
                    Open Player →
                  </button>
                </div>
              </div>
            ) : (
              /* TAB 2: INTERACTIVE PIPELINE STEPS (MANUAL CLICK, NO FORCED ANIMATION) */
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 sm:p-7 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                    <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold">Clinical Service Flow Pipeline</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-bold">
                    Status: {workflowNodes[activeStep].status}
                  </span>
                </div>

                <div className="space-y-2">
                  {workflowNodes.map((node, index) => {
                    const isActive = activeStep === index;
                    const Icon = node.icon;

                    return (
                      <div
                        key={node.id}
                        onClick={() => setActiveStep(index)}
                        className={`p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                          isActive
                            ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-500/30'
                            : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-1.5 rounded-xl ${node.bgColor} ${node.color} shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {node.name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                              {node.sample}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                              isActive
                                ? 'bg-blue-600 text-white font-bold'
                                : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {isActive ? 'Selected' : node.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <span>Interactive demonstration · Zero PHI</span>
                  <span>Sub-500ms inference SLA</span>
                </div>
              </div>
            )}

            {/* Scrabyt Video Demo Modal */}
            {isVideoModalOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Scrabyt Clinical AI Video Demonstration"
                className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsVideoPlaying(false);
                }}
              >
                <div
                  className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          Scrabyt · AI Clinical Intelligence Platform Walkthrough
                        </h3>
                        <div className="text-xs text-slate-400 font-mono">
                          Ambient Scribe, SOAP Note Synthesis & Billing Automation (02:15)
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsVideoModalOpen(false);
                        setIsVideoPlaying(false);
                      }}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                      aria-label="Close video player"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Video Presentation Screen */}
                  <div className="relative aspect-video w-full bg-black flex items-center justify-center p-6 sm:p-10">
                    <div className="text-center space-y-4 max-w-lg mx-auto">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                        <Activity className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">
                        Scrabyt Clinical Intelligence Walkthrough
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Watch how ambient doctor-patient dialog is transcribed in real-time, cross-checked with medical terminology, and converted into structured documentation with deterministic billing codes.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                          Zero Retained Audio
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                          HIPAA Compliant
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                          EHR Interoperable
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Modal CTA */}
                  <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-400">
                      Explore the live platform or request clinical deployment specs.
                    </span>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <a
                        href="https://www.scrabyt.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleExternalClick}
                        className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Visit Scrabyt.com</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile CTAs (Ordered precisely per Section 19: after visual on mobile) */}
            <div className="sm:hidden space-y-3 pt-2">
              <a
                href="https://www.scrabyt.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore Scrabyt website — opens in a new tab"
                onClick={handleExternalClick}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Explore Scrabyt</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleSecondaryClick}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Learn about our AI as a Service offerings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
