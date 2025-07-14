// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Container } from "@/components/ui/container";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// const projects = [
//   {
//     title: "Keffli Nassarawa Hospital",
//     location: "Health Care",
//     image: "/keffi-nassarawa-hospital.webp?height=300&width=400",
//   },
//   {
//     title: "Covid-19 Roof Top Installation",
//     location: "Health Care",
//     image: "/covid-19-roof-top-installation.webp?height=300&width=400",
//   },
//   {
//     title:
//       "Installation of High Density LED Streetlights in Kogi state Government House Lokoja and Environs in 2016",
//     location: "Street Lighting",
//     image: "/installation-high-density-streetlight.webp?height=300&width=400",
//   },
//   {
//     title: "Adebayo Palm Oil Milling Station, Edo State",
//     location: "Agriculture",
//     image: "/adebayo-palm-oil-milling.webp?height=300&width=400",
//   },
//   {
//     title: "Solar Pump Distribution in Delta, Edo and Rivers",
//     location: "Agriculture",
//     image: "/solar-pump-distribution.webp?height=300&width=400",
//   },
//   {
//     title:
//       "Routine Maintenance on Streetlight Infrastructure along Airport road, Abuja",
//     location: "Street Lighting",
//     image: "/routine-maintenance-streetlight-abuja.webp?height=300&width=400",
//   },
// ];

// export function ProjectsSection() {
//   return (
//     <section className="py-16 bg-gray-50">
//       <Container className="px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Latest Rural Electrification Projects,
//             <br />
//             Mini-Grid Solutions & Energizing Supplies
//           </h2>
//         </div>

//         <div className="relative">
//           <Carousel
//             opts={{
//               align: "start",
//               loop: true,
//             }}
//             className="w-full"
//           >
//             <CarouselContent className="-ml-2 md:-ml-4">
//               {projects.map((project, index) => (
//                 <CarouselItem
//                   key={index}
//                   className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
//                 >
//                   <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-0 p-0">
//                     <div className="aspect-[4/3] overflow-hidden">
//                       <img
//                         src={`/images/projects/${
//                           project.image || "placeholder.svg"
//                         }`}
//                         alt={project.title}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <CardContent className="flex flex-col flex-1 p-4">
//                       <div className="flex-1">
//                         <h3 className="font-semibold mb-2">
//                           {project.title.length > 30
//                             ? `${project.title.slice(0, 30)}...`
//                             : project.title}
//                         </h3>

//                         <p className="text-sm text-gray-600">
//                           {project.location}
//                         </p>
//                       </div>
//                       <Button
//                         size="sm"
//                         className="mt-4 w-full bg-transparent text-black border-primary border"
//                       >
//                         View Project
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="-left-8" />
//             <CarouselNext className="-right-8" />
//           </Carousel>
//         </div>

//         <div className="text-center mt-8">
//           <Button className="bg-primary hover:bg-primary/90">
//             View All Projects
//           </Button>
//         </div>
//       </Container>
//     </section>
//   );
// }

"use client";

import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { projectscard } from "@/lib/data/projectcard";
import Card from "@/components/ui/stack-cards";

export function ProjectsSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <main ref={container} className="relative  py-16 bg-gray-50">
      <div className="text-center ">
        <h2 className="text-3xl md:text-4xl font-bold ">
          Latest Rural Electrification Projects,
          <br />
          Mini-Grid Solutions & Energizing Supplies
        </h2>
      </div>
      {projectscard.map((project, i) => {
        const targetScale = 1 - (projectscard.length - i) * 0.05;
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}
