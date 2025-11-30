'use client';

import { useState } from 'react';
import { Snow } from '@/components/effects/snow';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TestSnowPage() {
  const [speed, setSpeed] = useState<'slow' | 'avg' | 'fast'>('avg');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>(
    'medium',
  );
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Mountain background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-800 to-transparent"></div>
      </div>

      {/* Snow Effect */}
      {enabled && <Snow speed={speed} intensity={intensity} />}

      {/* Content */}
      <Container className="relative z-10 py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            ❄️ Snow Effect Demo
          </h1>
          <p className="text-blue-100 text-lg drop-shadow-lg">
            Realistic snowfall with customizable speed and intensity
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Controls Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              {/* Enable/Disable */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Snow Effect
                  </h3>
                  <p className="text-blue-200 text-sm">
                    Toggle the snow overlay on/off
                  </p>
                </div>
                <Button
                  onClick={() => setEnabled(!enabled)}
                  variant={enabled ? 'default' : 'outline'}
                  size="lg"
                  className="min-w-[120px]"
                >
                  {enabled ? '❄️ Enabled' : '🚫 Disabled'}
                </Button>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Speed Control */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>⚡</span> Speed
                </h3>
                <div className="flex gap-3">
                  {(['slow', 'avg', 'fast'] as const).map(s => (
                    <Button
                      key={s}
                      onClick={() => setSpeed(s)}
                      variant={speed === s ? 'default' : 'outline'}
                      className={`flex-1 ${
                        speed === s
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white border-white/30'
                      }`}
                      size="lg"
                    >
                      {s === 'slow' && '🐌 Slow'}
                      {s === 'avg' && '🚶 Average'}
                      {s === 'fast' && '🏃 Fast'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Intensity Control */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>❄️</span> Intensity
                </h3>
                <div className="flex gap-3">
                  {(['low', 'medium', 'high'] as const).map(i => (
                    <Button
                      key={i}
                      onClick={() => setIntensity(i)}
                      variant={intensity === i ? 'default' : 'outline'}
                      className={`flex-1 ${
                        intensity === i
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white border-white/30'
                      }`}
                      size="lg"
                    >
                      {i === 'low' && '❄️ Light'}
                      {i === 'medium' && '❄️❄️ Medium'}
                      {i === 'high' && '❄️❄️❄️ Heavy'}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10"></div>

              {/* Current Configuration */}
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/60 text-sm mb-3 font-medium">
                  Current Configuration:
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-blue-600 text-white px-4 py-2">
                    Speed: {speed.toUpperCase()}
                  </Badge>
                  <Badge className="bg-purple-600 text-white px-4 py-2">
                    Intensity: {intensity.toUpperCase()}
                  </Badge>
                  <Badge
                    className={`${enabled ? 'bg-green-600' : 'bg-red-600'} text-white px-4 py-2`}
                  >
                    {enabled ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                ✨ Features
              </h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>
                    <strong className="text-white">Realistic Physics:</strong>{' '}
                    Snowflakes fall with natural motion, drift, and rotation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>
                    <strong className="text-white">
                      Custom Snowflake Shapes:
                    </strong>{' '}
                    Each snowflake has unique size, opacity, and rotation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>
                    <strong className="text-white">
                      Performance Optimized:
                    </strong>{' '}
                    Uses Canvas API with requestAnimationFrame for smooth 60fps
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>
                    <strong className="text-white">
                      Configurable Settings:
                    </strong>{' '}
                    Adjust speed (slow/avg/fast) and intensity (low/medium/high)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">▹</span>
                  <span>
                    <strong className="text-white">Overlay Mode:</strong> Uses
                    pointer-events-none and mix-blend-mode for non-intrusive
                    overlay
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Usage Example Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                💻 Usage Example
              </h3>
              <div className="bg-slate-950/50 rounded-lg p-4 font-mono text-sm text-blue-100 overflow-x-auto">
                <pre>{`import { Snow } from '@/components/effects/snow';

// In your layout or page component:
<Snow speed="fast" intensity="high" />

// Speed options: 'slow' | 'avg' | 'fast'
// Intensity options: 'low' | 'medium' | 'high'`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Preview Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-xl border-white/20 shadow-xl hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-white mb-2">
                  Winter Wonderland
                </h4>
                <p className="text-blue-200 text-sm">
                  Perfect for holiday themes and winter events
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/20 shadow-xl hover:bg-white/10 transition-all">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-white mb-2">
                  Seasonal Effect
                </h4>
                <p className="text-blue-200 text-sm">
                  Add atmospheric effects to any page or section
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-blue-200 text-sm">
            Built with React, Canvas API, and TypeScript ❄️
          </p>
        </div>
      </Container>
    </div>
  );
}
