"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Olooji Community 100kw Solar Hybrid Mini Grid",
    image: "/images/olooji-community.jpg?height=800&width=1400",
    description: "Ijebu-East LGA, Ogun State",
  },
  {
    id: 2,
    title: "40kw Solar Mini-Grid Obadore Community",
    image: "/images/obadore-ondo.jpg?height=800&width=1400",
    description: "Obadore LGA, Ondo State",
  },
  {
    id: 3,
    title: "100kWp Solar Hybrid Mini-Grid at Adebayo Community",
    image: "/images/adebayo-community.jpg?height=800&width=1400",
    description: "Ovia-South LGA, Edo State",
  },
  {
    id: 4,
    title: "50 kWp Solar Hybrid Mini-Grid at Makami Community",
    image: "/images/makami-kaduna.jpg?height=800&width=1400",
    description: "Kauru LGA, Kaduna State",
  },
  {
    id: 5,
    title: "Routine Maintenance on Streetlight Infrastructure",
    image: "/images/airport-road-abuja.jpg?height=800&width=1400",
    description: "Airport Road LGA, Abuja",
  },
  {
    id: 6,
    title: "Solar Farm Installation in Northern Nigeria",
    image: "/images/olooji-community.jpg?height=800&width=1400",
    description: "Northern Region, Nigeria",
  },
];


export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [slideStartTime, setSlideStartTime] = useState(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === currentSlide) return;

    setIsTransitioning(true);
    setShowContent(false);

    setTimeout(() => {
      setCurrentSlide(newIndex);
      setSlideStartTime(Date.now());
      setTimeout(() => {
        setShowContent(true);
        setIsTransitioning(false);
      }, 200);
    }, 800);
  };

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    changeSlide(index);
  };

  // Auto-play functionality with pause on hover
  useEffect(() => {
    const startAutoPlay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (!isPaused && !isTransitioning) {
          nextSlide();
        }
      }, 10000); // 10 seconds
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, isPaused, isTransitioning]);

  // const handleMouseEnter = () => {
  //   setIsPaused(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsPaused(false);
  //   setSlideStartTime(Date.now()); // Reset the slide timer
  // };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section
      className="relative min-h-[700px] overflow-hidden w-full"
    
    >
   
      <div className="absolute inset-0 bg-black">
        {heroSlides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className={`absolute inset-0 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat ${
                index === currentSlide && !isPaused ? "ken-burns-zoom" : ""
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
                transform: "scale(1.05)",
                transformOrigin: "center center",
              }}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full  text-white  hover:scale-110  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
      >
        <ChevronLeft className="h-24 w-24 text-white opacity-30 hover:opacity-70 hover:text-white group-hover:scale-110 transition-transform duration-200" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full  text-white  hover:scale-110  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
      >
        <ChevronRight className="h-24 w-24 text-white opacity-30 hover:opacity-70 hover:text-white group-hover:scale-110 transition-transform duration-200" />
      </button>

      {/* Content with smooth animations */}
      <div className="relative z-10 2xl:max-w-6xl text-white h-full flex items-end pb-12 min-h-[700px] w-full">
        <Container className="2xl:px-8">
          <div className="w-full max-w-4xl">
            {/* Animated Title */}
            <div className="overflow-hidden mb-6">
              <h1
                className={`text-4xl md:text-7xl font-extrabold leading-tight text-left transition-all duration-1000 ease-out ${
                  showContent
                    ? "transform translate-x-0 opacity-100 blur-0"
                    : "transform -translate-x-full opacity-0 "
                }`}
                style={{ transitionDelay: showContent ? "400ms" : "0ms" }}
              >
                {currentSlideData.title}
              </h1>
            </div>

            {/* Animated Description */}
            <div className="overflow-hidden mb-8">
              <p
                className={`text-lg md:text-xl opacity-90 text-left max-w-3xl transition-all duration-1000 ease-out ${
                  showContent
                    ? "transform translate-x-0 opacity-90 blur-0"
                    : "transform -translate-x-full opacity-0 "
                }`}
                style={{ transitionDelay: showContent ? "600ms" : "0ms" }}
              >
                {currentSlideData.description}
              </p>
            </div>

            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              {/* Read More - slides in from left */}
             <div className="overflow-hidden">
             <Button
                size="lg"
                className={`bg-primary hover:bg-primary/90 text-lg py-6 text-white transition-all duration-1000 ease-out hover:scale-105 ${
                  showContent
                    ? "transform translate-x-0 opacity-100 blur-0"
                    : "transform -translate-x-full opacity-0 "
                }`}
                style={{ transitionDelay: showContent ? "800ms" : "0ms" }}
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
             </div>

              {/* Our Services - slides in from right */}
              <Button
                size="lg"
                variant="outline"
                className={`border-white text-white hover:bg-white text-lg py-6 hover:text-black bg-transparent transition-all duration-1000 ease-out hover:scale-105 ${
                  showContent
                    ? "transform translate-x-0 opacity-100 blur-0"
                    : "transform translate-x-full opacity-0 "
                }`}
                style={{ transitionDelay: showContent ? "1000ms" : "0ms" }}
              >
                Our Services
              </Button>
            </div>
            {/* Custom Indicators - directly above title */}
            <div className="flex space-x-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`transition-all duration-500 rounded-full cursor-pointer hover:opacity-80 disabled:cursor-not-allowed ${
                    currentSlide === index
                      ? "w-8 h-1 bg-primary shadow-lg"
                      : "w-6 h-0.5 bg-white/50 hover:bg-white/70 hover:w-7"
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Custom CSS for iPhone-style Ken Burns effect */}
      <style jsx>{`
        .ken-burns-zoom {
          animation: kenBurnsZoom 10s ease-out forwards;
        }

        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.18);
          }
        }

        /* Pause animation on hover */
        .ken-burns-zoom:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
