import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"
import { MaskText } from "@/components/animations/MaskText"
import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    id: "1",
    name: "Dr. Aminu Bello",
    position: "CEO & Founder",
    image: "/placeholder.svg?height=200&width=200",
    bio: "A visionary leader with over 20 years of experience in renewable energy and sustainable development.",
    linkedin: "#",
    email: "aminu.bello@acoblighting.com",
  },
  {
    id: "2",
    name: "Fatima Yusuf",
    position: "Chief Operations Officer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Oversees all operational aspects, ensuring efficiency and project success.",
    linkedin: "#",
    email: "fatima.yusuf@acoblighting.com",
  },
  {
    id: "3",
    name: "Engr. David Okoro",
    position: "Head of Engineering",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Leads our engineering team, specializing in solar system design and implementation.",
    linkedin: "#",
    email: "david.okoro@acoblighting.com",
  },
  {
    id: "4",
    name: "Aisha Mohammed",
    position: "Community Engagement Manager",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Connects with communities, ensuring our projects meet local needs and foster empowerment.",
    linkedin: "#",
    email: "aisha.mohammed@acoblighting.com",
  },
  {
    id: "5",
    name: "Chukwudi Eze",
    position: "Project Manager",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Manages project lifecycles from conception to completion, ensuring timely delivery.",
    linkedin: "#",
    email: "chukwudi.eze@acoblighting.com",
  },
  {
    id: "6",
    name: "Grace Adebayo",
    position: "Head of Finance",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Manages financial strategies and ensures fiscal responsibility.",
    linkedin: "#",
    email: "grace.adebayo@acoblighting.com",
  },
]

export default function OurTeamPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Meet Our Team" },
  ]

  return (
    <>
      <PageHero title="Meet Our Team" backgroundImage="/images/about/our-team-hero.jpg?height=400&width=1200" />

      <Container className="px-4 py-8 bg-gray-50">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <MaskText phrases={["The Driving Force Behind Our Success"]} />
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our team comprises dedicated professionals, engineers, and community specialists committed to delivering
            excellence in every aspect of clean energy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="border shadow-md border-gray-200 bg-white text-center p-6 flex flex-col items-center"
            >
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary/20 shadow-md"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-3">{member.position}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{member.bio}</p>
              <div className="flex gap-3 mt-auto">
                {member.linkedin && (
                  <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6 text-gray-500 hover:text-primary transition-colors" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                )}
                {member.email && (
                  <Link href={`mailto:${member.email}`}>
                    <Mail className="h-6 w-6 text-gray-500 hover:text-primary transition-colors" />
                    <span className="sr-only">Email</span>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}
