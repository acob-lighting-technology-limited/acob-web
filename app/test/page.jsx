"use client";
import Image from "next/image";
import { useScroll, useTransform, motion, animate } from "framer-motion";
import { useRef, useState, useCallback } from "react";

export default function Index() {
  const container = useRef(null);
  const [isManualControl, setIsManualControl] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: "/images/hero3.JPG",
      scale: scale4,
      containerClass: "w-[25vw] h-[25vh]",
    },
    {
      src: "/images/hero1.JPG",
      scale: scale5,
      containerClass: "w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
    },
    {
      src: "/images/hero2.JPG",
      scale: scale6,
      containerClass: "w-[20vw] h-[45vh] -top-[10vh] -left-[25vw]",
    },
    {
      src: "/images/hero3.JPG",
      scale: scale5,
      containerClass: "w-[25vw] h-[25vh] left-[27.5vw]",
    },
    {
      src: "/images/hero4.JPG",
      scale: scale6,
      containerClass: "w-[20vw] h-[25vh] top-[27.5vh] left-[5vw]",
    },
    {
      src: "/images/hero5.JPG",
      scale: scale8,
      containerClass: "w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
    },
    {
      src: "/images/hero1.JPG",
      scale: scale9,
      containerClass: "w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]",
    },
  ];

  // Function to scroll to a specific image
  const scrollToImage = useCallback((targetIndex) => {
    if (!container.current) return;
    
    setIsManualControl(true);
    
    // Calculate the target scroll position
    const containerHeight = container.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = containerHeight - viewportHeight;
    
    // Map image index to scroll position (0 to 1 range)
    const targetProgress = targetIndex / (pictures.length - 1);
    const targetScrollY = targetProgress * maxScroll;
    
    // Smooth scroll to the target position
    animate(window.scrollY, window.scrollY + (targetScrollY - window.scrollY), {
      duration: 1,
      ease: "easeInOut",
      onUpdate: (value) => {
        window.scrollTo(0, value);
      },
      onComplete: () => {
        setTimeout(() => {
          setIsManualControl(false);
        }, 500);
      }
    });
  }, [pictures.length]);

  // Handle click on image
  const handleImageClick = useCallback((index) => {
    scrollToImage(index);
  }, [scrollToImage]);

  // Handle hover - scroll to image position
  const handleMouseEnter = useCallback((index) => {
    if (!isManualControl) {
      scrollToImage(index);
    }
  }, [scrollToImage, isManualControl]);

  return (
    <div ref={container} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {pictures.map(({ src, scale, containerClass }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="w-full h-full absolute top-0 flex items-center justify-center"
            >
              <div 
                className={`relative ${containerClass} cursor-pointer transition-all duration-300 hover:brightness-110 hover:z-10`}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => handleImageClick(index)}
              >
                <Image 
                  src={src} 
                  fill 
                  alt="image" 
                  className="object-cover transition-all duration-300"
                />
                {/* Invisible overlay to make the entire image area clickable */}
                <div className="absolute inset-0 hover:bg-white hover:bg-opacity-10 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Navigation dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {pictures.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToImage(index)}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300 hover:scale-125"
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}