import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import { getProjects } from '@/sanity/lib/client';
import type { Project } from '@/lib/types';

export default async function ProjectsPage() {
  const projects = await getProjects();

  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Projects' }];

  return (
    <>
      <PageHero
        title="Our Projects"
        backgroundImage="/images/services/header.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {projects.map((project: Project) => (
              <Card
                key={project._id}
                className="overflow-hidden border-0 custom-shadow shadow-none p-0 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  {project.images && project.images.length > 0 && (
                    <Image
                      src={project.images[0].asset.url || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className="hover:scale-105 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    />
                  )}
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{project.location}</span>
                  </div>
                  <Link href={`/projects/${project.slug.current}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Search */}

            <div className="bg-muted border-t-2  border-t-primary p-6 rounded-lg border-[1px]">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Search Projects
              </h3>
              <div className="relative border-[0.5px] rounded-md border-primary">
                <Input
                  placeholder="Search projects..."
                  className="pr-10 bg-surface border-primary !border-[0.5px] focus:border-primary focus:ring-primary text-foreground"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              </div>
            </div>
            {/* Categories (Example - you might want to fetch these from Sanity too) */}
            <div className="border-t-2 bg-muted border-t-primary p-6 rounded-lg border-[1px]">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Categories
              </h3>
              <ul className="space-y-2">
                {projects.map((project: Project) => (
                  <li key={project._id}>
                    <Link
                      href={`/projects/${project.slug.current}`}
                      className="p-2 border-primary border-[0.5px] rounded-lg bg-surface text-foreground hover:bg-primary hover:text-primary-foreground  flex items-center justify-between"
                    >
                      <span className="font-medium text-sm">
                        {project.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
