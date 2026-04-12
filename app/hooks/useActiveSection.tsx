'use client'

import { useEffect, useState } from 'react';

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = () => {
    let maxSection = null;
    let maxSectionHeight = 0;
  
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
        if (visibleHeight > maxSectionHeight) {
          maxSection = id;
          maxSectionHeight = visibleHeight;
        }
      }
    });
  
    setActiveSection(maxSection || '');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return activeSection;
};

export { useActiveSection };