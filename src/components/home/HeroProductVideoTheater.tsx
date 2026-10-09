import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Sparkles,
  Shield,
  Cpu,
  Layers,
  X,
  CheckCircle2,
  Activity,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Terminal,
  Database,
  Lock,
  Workflow,
  Stethoscope,
  Info,
} from 'lucide-react';
import { trackEvent, trackScrabytExternalClick } from '../../services/analytics';
import { soundEngine } from '../../services/soundEngine';

interface HeroProductVideoTheaterProps {
  onOpenConsultation?: () => void;
  onNavigate?: (href: string) => void;
  fullscreenModalOpen?: boolean;
  onCloseFullscreenModal?: () => void;
}

export interface VideoChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  productTag: string;
  badgeColor: string;
  stats: { label: string; value: string }[];
  description: string;
}

export const HeroProductVideoTheater: React.FC<HeroProductVideoTheaterProps> = ({
  onOpenConsultation,
  onNavigate,
  fullscreenModalOpen,
  onCloseFullscreenModal,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [progress, setProgress] = useState(38);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with external fullscreen control
  useEffect(() => {
    if (fullscreenModalOpen !== undefined) {
      setIsModalOpen(fullscreenModalOpen);
      if (fullscreenModalOpen) {
        setIsPlaying(true);
      }
    }
  }, [fullscreenModalOpen]);

  // Global event listener for triggering fullscreen video
  useEffect(() => {
    const handleTriggerFullscreen = () => {
      setIsModalOpen(true);
      setIsPlaying(true);
    };
    window.addEventListener('open-video-fullscreen', handleTriggerFullscreen);
    return () => window.removeEventListener('open-video-fullscreen', handleTriggerFullscreen);
  }, []);

  const chapters: VideoChapter[] = [
    {
      id: 'scrabyt',
      number: '01',
      title: 'Scrabyt Clinical AI Engine',
      subtitle: 'Ambient Sovereign Healthcare Intelligence',
      duration: '1:54',
      productTag: 'Live Sovereign Flagship',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      stats: [
        { label: 'SOAP Note Accuracy', value: '99.4%' },
        { label: 'Clinical Time Saved', value: '2.5 hrs/day' },
        { label: 'HIPAA & SOC 2', value: 'Certified' },
      ],
      description:
        'Ambient multi-party clinical dialog captured in real-time, converted into structured SOAP notes, verified orders, and ICD-10/CPT coding alignment with zero data retention.',
    },
    {
      id: 'agent-mesh',
      number: '02',
      title: 'Stateful Agent Mesh',
      subtitle: 'Deterministic Autonomous Reasoning',
      duration: '0:48',
      productTag: 'OmniCore Engine',
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      stats: [
        { label: 'Agent Coordination', value: '14 Workers' },
        { label: 'State Boundary', value: 'Deterministic' },
        { label: 'Evaluation Gate', value: 'Formal JSON Schema' },
      ],
      description:
        'Coordinated multi-agent workers executing dynamic task trees with strict fallback to human verification when confidence thresholds dip.',
    },
    {
      id: 'zero-retention',
      number: '03',
      title: 'Zero-Trust Inference Gateway',
      subtitle: 'Hardware Enclave & Token Redaction',
      duration: '1:12',
      productTag: 'Enterprise Gateway',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      stats: [
        { label: 'P95 Latency', value: '<312ms' },
        { label: 'PII Sanitization', value: '100% In-Flight' },
        { label: 'Data Retention', value: '0.00% Endpoints' },
      ],
      description:
        'Real-time PII stripping, token budget caching, and sovereign VPC routing that guarantees customer data never trains or leaks into external foundation models.',
    },
    {
      id: 'neural-rag',
      number: '04',
      title: 'Knowledge Synapse & Vector RAG',
      subtitle: 'Cryptographic Citation Provenance',
      duration: '2:45',
      productTag: 'Knowledge Synapse',
      badgeColor: 'border-violet-500/40 text-violet-400 bg-violet-500/10',
      stats: [
        { label: 'Index Scale', value: '10M+ Chunks' },
        { label: 'Reranker', value: 'Cross-Encoder' },
        { label: 'Attribution Trace', value: 'Token-level' },
      ],
      description:
        'Hybrid dense/sparse vector retrieval connecting distributed codebases, ERPs, and document silos with verifiable citation provenance graphs.',
    },
  ];

  const currentChapter = chapters[activeChapterIndex];

  // Auto-progress demo scrubber when playing
  useEffect(() => {
    if (!isPlaying) return;
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next chapter smoothly
          setActiveChapterIndex((curr) => (curr + 1) % chapters.length);
          return 0;
        }
        return prev + 1;
      });
    }, 400);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, chapters.length]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onCloseFullscreenModal) onCloseFullscreenModal();
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSelectChapter = (index: number) => {
    soundEngine.playClick();
    setActiveChapterIndex(index);
    setProgress(0);
    setIsPlaying(true);
    trackEvent('hero_video_chapter_switch', {
      chapter_id: chapters[index].id,
      chapter_title: chapters[index].title,
    });
  };

  const handleLaunchScrabyt = () => {
    trackScrabytExternalClick('homepage', 'hero_product_video');
    window.open('https://www.scrabyt.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto select-none">
      {/* Apple / Eternal style ambient backlight glow */}
      <div
        className={`absolute -inset-4 sm:-inset-8 rounded-[2.5rem] blur-3xl opacity-40 transition-all duration-700 pointer-events-none -z-10 ${
          activeChapterIndex === 0
            ? 'bg-gradient-to-r from-emerald-600/35 via-teal-600/25 to-cyan-500/30'
            : activeChapterIndex === 1
            ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-cyan-500/30'
            : activeChapterIndex === 2
            ? 'bg-gradient-to-r from-cyan-600/30 via-blue-600/20 to-teal-500/30'
            : 'bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-blue-500/30'
        }`}
        aria-hidden="true"
      />

      {/* Main Cinema Theater Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-950 text-white shadow-2xl overflow-hidden transition-all duration-300">
        {/* Cinema Stage Header / Architectural Bar */}
        <div className="px-5 sm:px-7 py-4 border-b border-white/10 bg-slate-950/95 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Refined Architectural Moniker */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-wider uppercase text-slate-300">
              Interactive Systems Walkthrough
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-normal">
              Autonomous Mesh & Sovereign Engine
            </span>
          </div>

          {/* Right: Refined Controls */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Interactive Model</span>
            </div>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              title={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setIsPlaying(true);
              }}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Expand Cinema Theater"
              title="Expand to Full Cinema"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Screen Canvas (Aspect 16:9 / 21:9 responsive) */}
        <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full bg-slate-950 flex flex-col justify-between overflow-hidden">
          {/* Subtle Grid Pattern Overlay */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Ambient Video Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

          {/* Simulated Active Product Viewport (Changes based on chapter) */}
          <div className="relative z-10 p-5 sm:p-8 flex-1 flex flex-col justify-between">
            {/* Top Chapter Tag & Hotspot Indicators */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <span className="text-white font-semibold">{currentChapter.title}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-normal">{currentChapter.subtitle}</span>
              </div>

              {/* Interactive Hotspot Feature Toggles */}
              <div className="hidden md:flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-lg border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot === 'latency' ? null : 'latency')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    activeHotspot === 'latency'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sub-340ms Latency
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot === 'privacy' ? null : 'privacy')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    activeHotspot === 'privacy'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Zero-Retention
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot === 'sovereignty' ? null : 'sovereignty')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    activeHotspot === 'sovereignty'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Private Enclave
                </button>
              </div>
            </div>

            {/* Hotspot Floating Spec Drawer (when toggled) */}
            {activeHotspot && (
              <div className="absolute top-16 right-6 sm:right-8 z-30 max-w-xs p-4 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-xl shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <div className="text-xs font-mono font-bold text-white uppercase">
                    {activeHotspot === 'latency' && 'Sub-320ms P95 Inference'}
                    {activeHotspot === 'privacy' && 'Cryptographic Zero Retention'}
                    {activeHotspot === 'sovereignty' && 'Private Dedicated VPC'}
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeHotspot === 'latency' &&
                    'Warm token caching and dedicated inference kernels yield deterministic sub-320ms latency across 500+ parallel multi-turn sessions.'}
                  {activeHotspot === 'privacy' &&
                    'Hardware-level memory zeroing post inference. No prompt tokens or completions are cached, stored, or used for model training.'}
                  {activeHotspot === 'sovereignty' &&
                    'Deploy natively into AWS GovCloud, GCP Dedicated Core, Azure Confidential Enclaves, or your bare-metal Kubernetes cluster.'}
                </p>
              </div>
            )}

            {/* Center Visual Presentation: High-Definition Simulated Product UI */}
            <div className="my-auto py-4 sm:py-6 max-w-4xl mx-auto w-full">
              {activeChapterIndex === 0 && (
                /* Chapter 1: Scrabyt Clinical AI (Featured First) */
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 backdrop-blur-md space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                          <span>Scrabyt · Sovereign Clinical Intelligence OS</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-semibold">
                            Production Live
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Ambient Physician-Patient Conversation to Verified EHR Structured Note
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLaunchScrabyt}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto hover:shadow-emerald-500/20 active:scale-95"
                    >
                      <span>Explore Scrabyt.com</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <div className="font-mono text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> 1. Ambient Audio Ingest
                      </div>
                      <div className="text-slate-300 leading-relaxed">Continuous multi-speaker acoustic separation and medical terminology filtering.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <div className="font-mono text-[11px] text-teal-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 2. Real-Time SOAP Notes
                      </div>
                      <div className="text-slate-300 leading-relaxed">Subjective, Objective, Assessment, Plan synthesized with verified clinical citation links.</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                      <div className="font-mono text-[11px] text-cyan-400 font-bold flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> 3. Sovereign Compliance
                      </div>
                      <div className="text-slate-300 leading-relaxed">Deterministic CPT & ICD-10 coding cross-verified with clinician sign-off and zero data retention.</div>
                    </div>
                  </div>
                </div>
              )}

              {activeChapterIndex === 1 && (
                /* Chapter 2: Stateful Agent Mesh */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-blue-400">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" /> Orchestrator
                      </span>
                      <span className="text-[10px] text-emerald-400">STATE: ACTIVE</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Dynamic Subtask Decomposition</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Splits high-level customer prompt into 14 deterministic sub-agents with signed execution contracts.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                      <span className="flex items-center gap-1.5">
                        <Workflow className="w-3.5 h-3.5" /> Reasoning Graph
                      </span>
                      <span className="text-[10px] text-blue-400">RETRY: 0</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">DAG Execution Engine</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Parallel execution with automatic state synchronization and non-blocking checkpoint recovery.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Formal Validator
                      </span>
                      <span className="text-[10px] text-emerald-400">100% SCHEMA MATCH</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Deterministic Output Gate</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Rigid JSON schema validation prevents hallucinations before downstream database mutation.
                    </p>
                  </div>
                </div>
              )}

              {activeChapterIndex === 2 && (
                /* Chapter 3: Zero-Trust Gateway */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-cyan-400" /> Ingress Sanitizer
                      </span>
                      <span className="text-[10px] text-emerald-400">0 PII LEAKS</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Sub-5ms Pre-Inference Scrubber</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Automatically detects and redacts SSNs, credit cards, EHR identifiers, and customer names.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" /> P95 Benchmark
                      </span>
                      <span className="text-[10px] text-cyan-400">312ms ACTUAL</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Hardware Enclave Routing</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Zero-retention routing through confidential compute enclaves with hardware attestation proofs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-blue-400">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-blue-400" /> Sovereign Egress
                      </span>
                      <span className="text-[10px] text-slate-400">RAM PURGED</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Immediate State Zeroing</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Memory structures are overwritten with cryptographically random noise after stream terminates.
                    </p>
                  </div>
                </div>
              )}

              {activeChapterIndex === 3 && (
                /* Chapter 4: Neural RAG */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-violet-400">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5" /> Hybrid Vector Index
                      </span>
                      <span className="text-[10px] text-violet-400">10M+ CHUNKS</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Dense + Sparse BM25 Fusion</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Combines semantic vector embeddings with exact lexical keywords to prevent recall drop-offs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" /> Neural Reranker
                      </span>
                      <span className="text-[10px] text-emerald-400">CROSS-ENCODER</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Context-Window Optimization</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Scores semantic relevance to eliminate noise before chunk injection into prompt windows.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Provenance Graph
                      </span>
                      <span className="text-[10px] text-cyan-400">HASH VERIFIED</span>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Cryptographic Citation</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Every generated assertion links directly back to the original source chunk hash for compliance auditing.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Scrubber & Transport Bar */}
            <div className="space-y-2">
              {/* Progress Scrubber */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
                  setProgress(newProgress);
                }}
                className="w-full bg-white/10 hover:bg-white/20 h-1.5 sm:h-2 rounded-full cursor-pointer relative overflow-hidden transition-colors"
                role="slider"
                aria-label="Video scrubber"
                aria-valuenow={progress}
              >
                <div
                  className="bg-white/80 h-full rounded-full relative transition-all duration-150"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md" />
                </div>
              </div>

              {/* Timecode & Playback Controls Row */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 text-white hover:text-slate-300 transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause simulation video' : 'Play simulation video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <span className="text-slate-300 font-medium">
                    {currentChapter.number} / 0{chapters.length} · {currentChapter.duration}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-slate-500 text-[11px]">
                    Press <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300">Space</kbd> to toggle playback
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsPlaying(true);
                    }}
                    className="text-slate-300 hover:text-white font-medium flex items-center gap-1.5 cursor-pointer text-xs transition-colors"
                  >
                    <span>Full Cinema View</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Tabs Along the Bottom */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border-t border-white/10 bg-slate-950">
          {chapters.map((chap, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                className={`p-4 text-left transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-white/[0.08] text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                {/* Active Indicator Top Border */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-white" />
                )}

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={isActive ? 'text-white font-semibold' : 'text-slate-500'}>
                    {chap.number}
                  </span>
                  <span className="text-[11px] text-slate-500">{chap.duration}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold tracking-tight text-white truncate">
                  {chap.title}
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5 font-normal">
                  {chap.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Product Link at the Bottom of Video: Scrabyt Launch Bar */}
        <div className="border-t border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-950 to-emerald-950/30 px-5 sm:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <div className="text-slate-300">
              <span className="font-semibold text-white tracking-tight">Scrabyt Clinical OS</span>
              <span className="text-slate-500 mx-2" aria-hidden="true">·</span>
              <span className="text-emerald-300/90 font-normal">Live in Ambient Healthcare Production</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.scrabyt.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Scrabyt Clinical OS live product — opens in a new tab"
              onClick={handleLaunchScrabyt}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white dark:bg-white text-slate-950 font-medium text-xs tracking-tight transition-all hover:bg-slate-100 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer group active:scale-[0.98]"
            >
              <span>Launch Live Product (Scrabyt.com)</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onNavigate('/ai-as-a-service/scrabyt');
                }}
                className="hidden md:inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
              >
                <span>Architecture Specs</span>
                <ChevronRight className="w-3 h-3 opacity-60" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Under-Player Micro-Metrics Bar (Clean unboxed editorial text) */}
      <div className="mt-5 px-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">Scrabyt Live Deployment Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
          <span>Zero Data Retention SLA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
          <span>Sub-340ms Inference Across Dedicated Enclaves</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
          <span>SOC 2 Type II & HIPAA Aligned</span>
        </div>
      </div>

      {/* Full Cinema Theater Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full Cinema Theater: Enterprise AI Architecture"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                     OmniCore Architecture Film · Technical Walkthrough
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    4K Cinematic Demonstration · Chapter {activeChapterIndex + 1}: {currentChapter.title}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close full cinema"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Screen */}
            <div className="relative aspect-video w-full bg-slate-950 flex flex-col justify-between overflow-hidden">
              {/* Grid Background Overlay */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

              {/* Inner Header Bar with Controls */}
              <div className="relative z-10 p-5 sm:p-6 flex items-center justify-between gap-3 border-b border-white/5">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold">{currentChapter.title}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 font-normal">{currentChapter.subtitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProgress(0);
                      setIsPlaying(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Restart chapter"
                    title="Restart chapter"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Simulation Showcase */}
              <div className="relative z-10 px-6 sm:px-12 py-4 my-auto w-full max-w-4xl mx-auto">
                <div className="space-y-4">
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono border border-blue-400/30 bg-blue-500/10 text-blue-300">
                      {currentChapter.productTag} · Sovereign Enclave
                    </span>
                    <h4 className="text-xl sm:text-3xl font-light text-white tracking-tight">
                      {currentChapter.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {currentChapter.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {currentChapter.stats.map((s) => (
                      <div
                        key={s.label}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md text-center shadow-xs"
                      >
                        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                          {s.label}
                        </div>
                        <div className="text-sm sm:text-base font-semibold text-white mt-1">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scrubber & Play Controls */}
              <div className="relative z-10 p-5 sm:p-6 bg-slate-950/90 border-t border-white/10 space-y-3">
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
                    setProgress(newProgress);
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 h-1.5 sm:h-2 rounded-full cursor-pointer relative overflow-hidden transition-colors"
                  role="slider"
                  aria-label="Modal video scrubber"
                  aria-valuenow={progress}
                >
                  <div
                    className="bg-white/90 h-full rounded-full relative transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 text-white hover:text-slate-300 transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause film' : 'Play film'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <span className="text-slate-300 font-medium">
                      Chapter {currentChapter.number} / 0{chapters.length} · {currentChapter.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                    {chapters.map((chap, idx) => (
                      <button
                        key={chap.id}
                        type="button"
                        onClick={() => handleSelectChapter(idx)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                          activeChapterIndex === idx
                            ? 'bg-white text-slate-950 font-semibold shadow-xs'
                            : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {chap.number} {chap.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Chapter Grid & CTA */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs text-slate-300">
                  <strong className="text-white">Scrabyt Live Product:</strong> Sovereign Clinical Intelligence OS
                </span>
                <a
                  href="https://www.scrabyt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLaunchScrabyt}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>scrabyt.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    if (onOpenConsultation) onOpenConsultation();
                  }}
                  className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Schedule Technical Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
