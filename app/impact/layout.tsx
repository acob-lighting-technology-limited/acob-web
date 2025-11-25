import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact Metrics - ACOB Lighting Technology Limited',
  description:
    'Aggregated impact metrics from all ACOB Lighting projects across Nigeria.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
