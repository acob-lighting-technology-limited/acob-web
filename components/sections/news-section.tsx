import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"

const news = [
  {
    title: "JOB OPPORTUNITIES AT ACOB LIGHTING TECHNOLOGY LIMITED!",
    date: "February 6, 2025",
    author: "ACOB LIGHTING",
    excerpt:
      "We're hiring for multiple roles across different departments! If you are passionate about JOIN OUR TEAM AT ACOB LIGHTING TECHNOLOGY LIMITED! We are expanding our workforce and looking...",
    image: "/images/job-vacancy.webp?height=200&width=400",
    category: "Careers",
    categoryColor: "bg-primary",
    buttonStyle: "outline",
    hasAccent: false,
  },
  {
    title: "ACOB Staff Retreat 2024!",
    date: "December 23, 2024",
    author: "ACOB LIGHTING",
    excerpt:
      "Wrapped Up the ACOB Staff Retreat 2024! The end of our retreat marks the beginning of a renewed commitment to innovation, excellence, and sustainability. Equipped with actionable strategies,...",
    image: "/images/acob-team.webp?height=200&width=400",
    category: "Retreats",
    categoryColor: "bg-primary",
    buttonStyle: "outline",
    hasAccent: false,
  },
  {
    title: "CEO Award of Excellence",
    date: "December 22, 2024",
    author: "ACOB LIGHTING",
    excerpt:
      "Rewarding Excellence and Hard-work is at the Heart of ACOB Management. As management awards staff who have Exceptionally contributed in no small measures to the growth of the...",
    image: "/images/acob-award.webp?height=200&width=400",
    category: "Retreats, Staff Award",
    categoryColor: "bg-primary",
    buttonStyle: "solid",
    hasAccent: true,
  },
]

export function NewsSection() {
  return (
    <section className="py-16 bg-white">
      <Container className="px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            News & Announcements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Recent Updates</h2>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-lg border-0 custom-shadow transition-shadow relative py-0 ${article.hasAccent ? "border-b-4 border-b-primary" : ""}`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                {/* Category Tag */}
                <div
                  className={`absolute top-4 left-4 ${article.categoryColor} text-white px-3 py-1 rounded text-sm font-medium`}
                >
                  {article.category}
                </div>
              </div>

              <CardContent className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{article.title}</h3>

                {/* Date and Author */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.author}</span>
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{article.excerpt}</p>

                {/* Read More Button */}
                {article.buttonStyle === "outline" ? (
                  <Button variant="outline" className="bg-transparent border-gray-400 text-gray-700 hover:bg-gray-50">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
