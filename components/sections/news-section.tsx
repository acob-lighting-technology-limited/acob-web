import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { getUpdatePosts } from "@/sanity/lib/client" // Changed to getUpdatePosts

export async function NewsSection() {
  const posts = await getUpdatePosts() // Fetches update posts
  const latestPosts = posts.slice(0, 3) // Get only the latest 3 posts

  return (
    <section className="py-16 bg-white">
      <Container className="px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            News & Announcements
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Recent Updates</h2> {/* Renamed title */}
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestPosts.map((post: any, index: number) => (
            <Card
              key={post._id}
              className={`overflow-hidden hover:shadow-lg border-0 custom-shadow transition-shadow relative py-0 flex flex-col ${
                index === 2 ? "border-b-4 border-b-primary" : ""
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {/* Category Tag */}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                  {post.category?.name || "News"}
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1 h-full">
                <div>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{post.title}</h3>

                  {/* Date and Author */}
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                </div>

                {/* Read More Button */}
                <div className="mt-auto pt-6">
                  <Link href={`/updates/${post.slug.current}`}>
                    {" "}
                    {/* Changed link to /updates */}
                    <Button className="bg-transparent border-[0.5px] border-primary text-gray-700 hover:bg-primary hover:text-white transition-colors duration-500">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/updates">
            {" "}
            {/* Changed link to /updates */}
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              View All Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
