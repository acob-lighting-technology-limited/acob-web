"use client";

import Image from "next/image";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  link: string;
  url?: string;
  color: string;
  progress: any;
  range: number[];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i = 0,
  title = "",
  description = "",
  src = "placeholder.jpg",
  url = "#",
  color =  "#ffffff",
  progress = { get: () => 0 }, // Mocked for safety
  range = [0, 1],
  targetScale = 1,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center text-white  justify-center sticky top-0"
    >

      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-1vh + ${i * 25}px)`,
        }}
        className="relative -top-1/4 h-[600px] w-[1300px] rounded-[12px] p-5 flex flex-col transform origin-top"
      >
        <h2 className="  text-[28px] font-bold mb-0 text-left">{title}</h2>

        <div className="flex flex-row-reverse h-full mt-6 gap-12">
          {/* Description Section */}
          <div className="w-1/5 relative top-[10%]">
            <p className="text-[16px] leading-relaxed">
              <span className="text-[28px] font-serif float-left mr-1 leading-none">
                {description.charAt(0)}
              </span>
              {description.slice(1)}
            </p>
            <span className="flex items-center gap-2 mt-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline cursor-pointer"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          {/* Image Section */}
          <div className="relative w-4/5 h-full rounded-[12px] overflow-hidden">
            <motion.div className="w-full h-full" >
              <Image
                src={`/images/projects/${src}`}
                alt="image"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
