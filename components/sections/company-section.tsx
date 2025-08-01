'use client';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskText } from '../animations/MaskText';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function CompanySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      if (isPlaying) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      } else {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      if (isMuted) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"unMute","args":""}',
          '*'
        );
      } else {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"mute","args":""}',
          '*'
        );
      }
      setIsMuted(!isMuted);
    }
  };

  // Intersection Observer for autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          setTimeout(() => {
            const iframe = iframeRef.current;
            if (iframe?.contentWindow) {
              iframe.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                '*'
              );
              setIsPlaying(true);
            }
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  return (
    <section className="relative min-h-screen bg-black dark:bg-zinc-950 overflow-hidden transition-colors duration-700">
      {/* Gradient background from bottom left corner */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 from-0% to-black to-80% dark:bg-gradient-to-t dark:from-zinc-950 dark:to-black transition-colors duration-700" />

      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]" />

      <div className="relative z-10 min-h-screen flex items-stretch">
        <Container className="px-4">
          <div className="flex gap-16 items-stretch min-h-screen">
            {/* Text Content - Now positioned at bottom */}
            <div className="text-white w-1/3 flex flex-col justify-end pb-16">
              <MaskText
                phrases={['ACOB LIGHTING TECHNOLOGY LIMITED']}
                className="text-4xl md:text-3xl lg:text-6xl font-extrabold mb-8 text-white drop-shadow-2xl"
              />
              <MaskText
                phrases={[
                  'We are committed to providing sustainable energy solutions',
                  'that transform communities across Nigeria.',
                  'Our expertise in solar technology and mini-grid systems',
                  'has made us a trusted partner for rural electrification projects',
                  'and commercial solar installations.',
                ]}
                className="text-zinc-100 mb-8 leading-relaxed text-base drop-shadow-lg"
              />
              <MaskText
                phrases={[
                  'With years of experience in the renewable energy sector,',
                  'we continue to innovate and deliver cutting-edge solutions',
                  'that meet the growing energy demands of our clients.',
                ]}
                className="text-zinc-200 mb-10 leading-relaxed drop-shadow-lg"
              />
              <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg py-6 px-8 rounded-xl font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                Learn More About Us
              </Button>
            </div>

            {/* Right Column with Video and Cards */}
            <div className="space-y-8 w-2/3 py-16">
              {/* Video Container */}
              <div
                ref={videoContainerRef}
                className="relative group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
                  {/* Video Iframe */}
                  <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/izxpZMcdWsg?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&mute=1&loop=1&playlist=izxpZMcdWsg"
                    title="ACOB Lighting Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute h-full inset-0 rounded-2xl border-0"
                  />

                  {/* Video Controls Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 rounded-full p-4 hover:scale-110 border border-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Top Right Controls */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full border border-white/20 transition-all duration-200 hover:scale-105"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Subtle glow effect that blends with dark background */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800/20 via-zinc-700/20 to-zinc-800/20 rounded-2xl blur-xl opacity-50 -z-10" />
                </div>
              </div>

              {/* Feature Cards Below Video */}
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5">
                  <h3 className="text-white text-xl font-bold mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Solar Solutions
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Advanced photovoltaic systems for residential and commercial
                    applications.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5">
                  <h3 className="text-white text-xl font-bold mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Mini-Grid Systems
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Comprehensive off-grid solutions for rural electrification
                    projects.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5">
                  <h3 className="text-white text-xl font-bold mb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Energy Storage
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Cutting-edge battery technology for reliable power
                    management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
