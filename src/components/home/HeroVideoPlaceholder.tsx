import React from 'react';
import { HeroProductVideoTheater } from './HeroProductVideoTheater';

interface HeroVideoPlaceholderProps {
  onOpenConsultation?: () => void;
  onNavigate?: (href: string) => void;
}

export const HeroVideoPlaceholder: React.FC<HeroVideoPlaceholderProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  return (
    <HeroProductVideoTheater
      onOpenConsultation={onOpenConsultation}
      onNavigate={onNavigate}
    />
  );
};
