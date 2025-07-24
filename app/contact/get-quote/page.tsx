import { Container } from "@/components/ui/container"
import { PageHero } from "@/components/ui/page-hero"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ContactSection } from "@/components/sections/contact-section"
import { MaskText } from "@/components/animations/MaskText"

export default function GetQuotePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "Get a Quote" },
  ]

  return (
    <>
      <PageHero title="Request a Quote" backgroundImage="/images/contact/get-quote-hero.jpg?height=400&width=1200">
        <MaskText
          phrases={[
            "Tell us about your energy needs, and we'll provide a tailored solution.",
            "Our experts are ready to assist you.",
          ]}
          className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed"
        />
      </PageHero>

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
        {/* Reusing the existing ContactSection component */}
        <ContactSection />
      </Container>
    </>
  )
}
