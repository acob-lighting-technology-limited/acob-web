"use client"

import type React from "react"

import Image from "next/image"
import { useTransform, motion, useScroll } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "./button"
import { ArrowRight, MapPin } from "lucide-react"

interface CardProps {
  i: number
  title: string
  description: string
  images: { asset: { url: string } }[] // Updated to match Sanity image asset structure
  location: string
  url?: string
  color?: string
  gradientFrom: string
  gradientTo: string
  progress: any
  range: number[]
  targetScale: number
}

const Card: React.FC<CardProps> = ({
  i = 0,
  title = "",
  description = "",
  images = [], // Default to empty array
  location = "Nigeria",
  url = "#",
  color = "#ffffff",
  gradientFrom = "#000000",
  gradientTo = "#000000",
  progress = { get: () => 0 }, // Mocked for safety
  range = [0, 1],
  targetScale = 1,
}) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="h-screen flex items-center text-white  justify-center sticky top-0">
      <motion.div
        style={{
          backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,

          scale,
          top: `calc(-1vh + ${i * 25}px)`,
        }}
        className="relative -top-1/4 h-[600px] w-[1300px] rounded-[20px] p-16 flex flex-col transform origin-top"
      >
        <div className="flex justify-between h-full gap-16">
          {/* Description Section */}

          <div className="w-1/2 flex flex-col h-full max-w-md">
            <div className="space-y-6">
              <h2 className="text-5xl font-extrabold text-left">
                {title.length > 50 ? `${title.slice(0, 50)}...` : title}
              </h2>

              <p className="text-xl leading-relaxed">{description}</p>
              <p className="flex gap-2 text-lg items-center">
                <MapPin />
                {location}
              </p>
            </div>

            <div className="mt-auto pt-6">
              <Link href={url}>
                {" "}
                {/* Use the passed URL */}
                <Button className="bg-[#07F507]/70 text-lg py-6 !px-8 hover:bg-[#07F507]/60 text-white">
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-1/2 h-full grid grid-rows-2 grid-cols-2 gap-4 rounded-[20px] overflow-hidden">
            {images[0] && (
              <div className="row-span-1 col-span-2 relative rounded-[16px] overflow-hidden">
                <Image
                  src={images[0].asset.url || "/placeholder.svg"} // Use Sanity image URL
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {images[1] && (
              <div className="relative rounded-[16px] overflow-hidden">
                <Image
                  src={images[1].asset.url || "/placeholder.svg"} // Use Sanity image URL
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {images[2] && (
              <div className="relative rounded-[16px] overflow-hidden">
                <Image
                  src={images[2].asset.url || "/placeholder.svg"} // Use Sanity image URL
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Card
