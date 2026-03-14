'use client';

import { useEffect } from 'react';
import { viewContent } from '@/lib/pixel';

export default function LpPixel() {
  useEffect(() => {
    viewContent('landing_page');
  }, []);

  return null;
}
