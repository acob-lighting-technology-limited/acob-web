'use client';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { MaskText } from '../animations/MaskText';
import Link from 'next/link';
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
          '*',
        );
      } else {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*',
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
          '*',
        );
      } else {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"mute","args":""}',
          '*',
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
                '*',
              );
              setIsPlaying(true);
            }
          }, 500);
        }
      },
      { threshold: 0.3 },
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  return (
    <section className="relative min-h-screen bg-background overflow-hidden transition-colors duration-700">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[length:50px_50px]" />

      <div className="relative z-10 min-h-screen flex items-center">
        <Container className="px-4 py-8 md:py-16">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 items-stretch min-h-screen">
            {/* Text Content */}
            <div className="text-foreground w-full lg:w-1/3 flex flex-col justify-center lg:justify-end pb-8 lg:pb-16 order-2 lg:order-1">
              <MaskText
                phrases={['ACOB LIGHTING TECHNOLOGY LIMITED']}
                className="text-3xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold mb-6 lg:mb-8 text-foreground drop-shadow-2xl"
              />
              <MaskText
                phrases={[
                  'We are committed to providing sustainable energy solutions',
                  'that transform communities across Nigeria.',
                  'Our expertise in solar technology and mini-grid systems',
                  'has made us a trusted partner for rural electrification projects',
                  'and commercial solar installations.',
                ]}
                className="text-muted-foreground mb-6 lg:mb-8 leading-relaxed text-sm md:text-base "
              />
              <MaskText
                phrases={[
                  'With years of experience in the renewable energy sector,',
                  'we continue to innovate and deliver cutting-edge solutions',
                  'that meet the growing energy demands of our clients.',
                ]}
                className="text-muted-foreground/80 mb-8 lg:mb-10 leading-relaxed text-sm md:text-base "
              />
              <Link href="/about">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 text-base md:text-lg py-4 md:py-6 px-6 md:px-8 rounded-xl font-semibold backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
            </div>

            {/* Right Column with Video and Cards */}
            <div className="space-y-6 lg:space-y-8 w-full lg:w-2/3 order-1 lg:order-2">
              {/* Video Container */}
              <div
                ref={videoContainerRef}
                className="relative group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-muted/20 backdrop-blur-sm">
                  {/* Video Iframe */}
                  <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/INhxpxlCyL0?enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&mute=1&loop=1&playlist=INhxpxlCyL0"
                    title="ACOB Lighting Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute h-full inset-0 rounded-2xl border-0"
                  />

                  {/* Video Controls Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent transition-all duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlay}
                        className="bg-background/80 backdrop-blur-md hover:bg-background/90 transition-all duration-300 rounded-full p-3 md:p-4 hover:scale-110 border border-border"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                        ) : (
                          <Play className="w-5 h-5 md:w-6 md:h-6 text-foreground ml-0.5 md:ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Top Right Controls */}
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 flex items-center space-x-2">
                      <button
                        onClick={toggleMute}
                        className="bg-background/80 backdrop-blur-md hover:bg-background/90 text-foreground p-1.5 md:p-2 rounded-full border border-border transition-all duration-200 hover:scale-105"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3 h-3 md:w-4 md:h-4" />
                        ) : (
                          <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Subtle glow effect that blends with theme background */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 rounded-2xl blur-xl opacity-50 -z-10" />
                </div>
              </div>

              {/* Feature Cards Below Video */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="bg-card backdrop-blur-md p-4 md:p-6 rounded-2xl border border-border hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5">
                  <h3 className="text-card-foreground text-lg  font-bold mb-2 md:mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 md:mr-3"></div>
                    Solar Solutions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Advanced photovoltaic systems for residential and commercial
                    applications.
                  </p>
                </div>

                <div className="bg-card backdrop-blur-md p-4 md:p-6 rounded-2xl border border-border hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5">
                  <h3 className="text-card-foreground text-lg  font-bold mb-2 md:mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 md:mr-3"></div>
                    Mini-Grid Systems
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    Comprehensive off-grid solutions for rural electrification
                    projects.
                  </p>
                </div>

                <div className="bg-card backdrop-blur-md p-4 md:p-6 rounded-2xl border border-border hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/5 md:col-span-2 lg:col-span-1">
                  <h3 className="text-card-foreground text-lg  font-bold mb-2 md:mb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 md:mr-3"></div>
                    Energy Storage
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
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
