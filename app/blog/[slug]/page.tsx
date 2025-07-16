import type React from "react"
import { Container } from "@/components/ui/container"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getBlogPost, getBlogPosts, urlFor, getApprovedCommentsForPost } from "@/sanity/lib/client"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CommentForm } from "@/components/blog/comment-form"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

// Custom Portable Text Components
const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value.asset) return null
      const imageUrl = urlFor(value).url()
      return (
        <div className="w-full md:w-1/2 px-2 my-4">
          {" "}
          {/* Each image takes half width, with horizontal padding */}
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={value.alt || "Blog post image"}
            width={800} // Provide a default width/height, ideally from image metadata
            height={600} // Provide a default width/height
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      )
    },
  },
  block: {
    // You can customize other block types here if needed
    h1: ({ children }: { children: React.ReactNode }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }: { children: React.ReactNode }) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }: { children: React.ReactNode }) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
    normal: ({ children }: { children: React.ReactNode }) => <p className="my-2">{children}</p>,
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => <ul className="list-disc pl-5 my-2">{children}</ul>,
    number: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal pl-5 my-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li className="my-1">{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li className="my-1">{children}</li>,
  },
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params explicitly as suggested by the error message
  // Although params is typically a plain object, this might be a Next.js internal requirement
  const { slug } = await params // Destructure after awaiting

  const post = await getBlogPost(slug) // Use the awaited slug

  if (!post) {
    notFound()
  }

  // Fetch approved comments for this post
  const comments = await getApprovedCommentsForPost(post._id)

  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]

  return (
    <Container className="px-4 py-8">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <article className="space-y-8">
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={post.featuredImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Header */}
            <div>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
                {post.category && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="bg-primary text-white px-2 py-1 rounded text-xs">
                      {post.category.name || "News"}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            </div>

            {/* Post Content - Wrapped in flex for image grid */}
            <div className="prose prose-lg max-w-none flex flex-wrap -mx-2">
              <PortableText value={post.content} components={components} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-8 border-t">
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="flex items-center gap-4 pt-8 border-t">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                  Facebook
                </Button>
                <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                  Twitter
                </Button>
                <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                  LinkedIn
                </Button>
              </div>
            </div>
          </article>

          {/* Display Comments */}
          <Card className="mt-12 border-0 custom-shadow shadow-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment: any) => (
                    <div key={comment._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900">{comment.name}</p>
                        <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                      {comment.website && (
                        <a
                          href={comment.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm hover:underline mt-1 block"
                        >
                          {comment.website}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments yet. Be the first to leave a reply!</p>
              )}
            </CardContent>
          </Card>

          {/* Comment Form */}
          <CommentForm postId={post._id} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 sticky top-20 self-start">
          {/* Search */}
          <Card className="border-0 custom-shadow shadow-none">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Search</h3>
              <div className="relative border-[0.5px] rounded-md border-primary">
                <Input placeholder="Search posts..." className="pr-10" />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="border-0 custom-shadow shadow-none">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-600">Battery Materials</span>
                </li>
                <li>
                  <span className="text-gray-600">Careers</span>
                </li>
                <li>
                  <span className="text-gray-600">Energy Summit</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
