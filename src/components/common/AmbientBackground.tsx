import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp (linear interpolation) for calming, organic response
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={
        {
          '--mouse-x': '50vw',
          '--mouse-y': '30vh',
        } as React.CSSProperties
      }
    >
      {/* Soothing living aurora orb 1: Top-left / center slow floating ambient glow */}
      <div
        className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full blur-[120px] pointer-events-none animate-ambient-float opacity-60 dark:opacity-20 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.35) 0%, rgba(199, 210, 254, 0.25) 45%, transparent 70%)',
        }}
      />

      {/* Soothing living aurora orb 2: Bottom-right slow floating warm/teal ambient glow */}
      <div
        className="absolute top-[40%] -right-[10%] w-[750px] h-[750px] rounded-full blur-[140px] pointer-events-none animate-ambient-float-reverse opacity-50 dark:opacity-25 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(165, 243, 252, 0.3) 0%, rgba(196, 181, 253, 0.2) 50%, transparent 75%)',
        }}
      />

      {/* Soothing living aurora orb 3: Center subtle emerald/cyan breath */}
      <div
        className="absolute top-[75%] left-[25%] w-[550px] h-[550px] rounded-full blur-[130px] pointer-events-none animate-soothing-pulse opacity-40 dark:opacity-15 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(167, 243, 208, 0.25) 0%, rgba(147, 197, 253, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* Interactive cursor spotlight: soft, warm/sapphire diffused aura */}
      <div
        className="absolute inset-0 opacity-70 dark:opacity-40 transition-opacity duration-700"
        style={{
          background: `radial-gradient(750px circle at var(--mouse-x) var(--mouse-y), rgba(96, 165, 250, 0.08), rgba(168, 85, 247, 0.03) 45%, transparent 75%)`,
        }}
      />

      {/* Whisper-fine geometric hairline grid with subtle radial vignette */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
    </div>
  );
};
