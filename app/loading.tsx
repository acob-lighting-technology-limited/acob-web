'use client';

import SquareFlipLoader from '@/components/loader/square-flip-loader';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-background">
      <SquareFlipLoader />
    </div>
  );
}
