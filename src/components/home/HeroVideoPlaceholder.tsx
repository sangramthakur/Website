import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Shield,
  Cpu,
  Layers,
  X,
  CheckCircle2,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface HeroVideoPlaceholderProps {
  onOpenConsultation?: () => void;
}

export const HeroVideoPlaceholder: React.FC<HeroVideoPlaceholderProps> = ({
  onOpenConsultation,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(24); // percentage

  const chapters = [
    { title: '01. Zero-Trust Inference Gateway', duration: '0:48', desc: 'Pre-inference PII redactors & token optimization' },
    { title: '02. Stateful Agent Mesh', duration: '1:12', desc: 'Autonomous reasoning loops with deterministic state boundaries' },
    { title: '03. Enterprise Hybrid RAG', duration: '1:54', desc: 'Vector reranking with cryptographic citation provenance' },
    { title: '04. Multi-Tenant Deployment', duration: '2:45', desc: 'Private VPC peering and sub-500ms p95 latency guarantees' },
  ];

  // Auto-progress demo scrubber when modal is open and playing
  useEffect(() => {
    if (!isPlaying && !isModalOpen) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 450);
    return () => clearInterval(interval);
  }, [isPlaying, isModalOpen]);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      {/* Video Placeholder Card (Replaces 3D Animation) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden group">
        {/* Ambient Backlight Glow */}
        <div
          className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-indigo-600/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Video Aspect Ratio Box (16:9) */}
        <div className="relative aspect-video w-full overflow-hidden flex flex-col justify-between bg-slate-950 select-none">
          {/* Simulated Enterprise Dashboard Poster / Video Still */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30"
              aria-hidden="true"
            />

            {/* Poster Content: Simulated Live Enterprise Architecture UI */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-400 font-medium hidden sm:inline">
                    enterprise-ai-runtime-v4.2.mp4
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    4K · 60 FPS
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    03:18
                  </span>
                </div>
              </div>

              {/* Graphic Wireframe Mockup Behind the Play Button */}
              <div className="grid grid-cols-3 gap-3 my-auto opacity-40 group-hover:opacity-60 transition-opacity">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400">
                    <Activity className="w-3 h-3" />
                    <span>Inference P95</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-white">340ms</div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-4/5" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <Shield className="w-3 h-3" />
                    <span>Zero Data Retention</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-white">100% Active</div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-violet-400">
                    <Cpu className="w-3 h-3" />
                    <span>Agent Mesh</span>
                  </div>
                  <div className="text-lg font-bold font-mono text-white">14 Agents</div>
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-violet-500 h-full w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Play Button Overlay */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setIsPlaying(true);
              }}
              aria-label="Play Platform Architecture and Capabilities Video Walkthrough"
              className="group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/50"
            >
              {/* Pulsing ring */}
              <span className="absolute -inset-2 rounded-full border-2 border-blue-400/40 animate-ping pointer-events-none" />
              <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1 transition-transform group-hover/btn:scale-110" />
            </button>

            <div className="mt-4 space-y-1">
              <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center justify-center gap-2">
                <span>Watch Technical Overview</span>
                <span className="text-xs font-mono text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800/60">
                  3 min
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xs sm:max-w-sm">
                See how enterprises deploy zero-retention AI agents, managed RAG, and production pipelines.
              </p>
            </div>
          </div>

          {/* Bottom Video Player Control Bar */}
          <div className="relative z-10 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2">
            {/* Progress Bar */}
            <div
              onClick={() => {
                setIsModalOpen(true);
                setIsPlaying(true);
              }}
              className="w-full bg-slate-800 hover:bg-slate-700 h-1.5 rounded-full cursor-pointer relative overflow-hidden transition-colors"
            >
              <div
                className="bg-blue-500 h-full rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow" />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsPlaying(true);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-4 h-4 fill-current" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
                  00:48 / 03:18
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                  1080p HD
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsPlaying(true);
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  aria-label="Open fullscreen video player"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Caption bar underneath the video card */}
        <div className="p-3.5 bg-slate-900/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-300 font-medium">Architecture Walkthrough:</span>
            <span className="hidden sm:inline">Zero-Trust AI Gateways & Autonomous Agents</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(true);
              setIsPlaying(true);
            }}
            className="text-blue-400 hover:text-blue-300 font-semibold font-mono text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Launch Video Player</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Video Player Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video Walkthrough: Enterprise AI Systems Architecture"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
          onClick={() => {
            setIsModalOpen(false);
            setIsPlaying(false);
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Enterprise AI Systems · Production Architecture Walkthrough
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    High-Definition Technical Demonstration (3m 18s)
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsPlaying(false);
                }}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Screen Area */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {/* Animated Walkthrough Visual Presentation */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/50 p-6 sm:p-10 flex flex-col justify-between">
                {/* Active Chapter Header */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400">
                    <span>Now Playing:</span>
                    <span className="font-bold text-white">{chapters[currentChapter].title}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Chapter {currentChapter + 1} of {chapters.length}
                  </span>
                </div>

                {/* Chapter Deep Dive Graphic Center */}
                <div className="space-y-4 max-w-xl mx-auto text-center py-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                    <Layers className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-bold text-white">
                      {chapters[currentChapter].title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {chapters[currentChapter].desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                      p95 &lt; 340ms
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                      Zero PII Retention
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                      Multi-Cloud VPC
                    </span>
                  </div>
                </div>

                {/* Bottom Scrub Line */}
                <div className="space-y-2">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{progress}% Completed</span>
                    <span>HD 1080p · Simulated Live Stream</span>
                  </div>
                </div>
              </div>

              {/* Pause/Play Center Overlay Toggle */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <div className="w-16 h-16 rounded-full bg-slate-900/90 text-white flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105">
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white ml-0.5" />
                  )}
                </div>
              </button>
            </div>

            {/* Chapter Selector & Call to Action Bar */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 space-y-4">
              {/* Chapter Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {chapters.map((chap, idx) => (
                  <button
                    key={chap.title}
                    type="button"
                    onClick={() => {
                      setCurrentChapter(idx);
                      setProgress(idx * 25 + 5);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      currentChapter === idx
                        ? 'border-blue-500 bg-blue-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold truncate">{chap.title}</div>
                    <div className="text-[10px] text-slate-500">{chap.duration}</div>
                  </button>
                ))}
              </div>

              {/* Modal Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-400">
                  Ready to deploy these architectures into your infrastructure?
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      if (onOpenConsultation) {
                        onOpenConsultation();
                      }
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Request Technical Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
