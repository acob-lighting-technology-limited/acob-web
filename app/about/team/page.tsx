import { Container } from '@/components/ui/container';
import { PageHero } from '@/components/ui/page-hero';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { MaskText } from '@/components/animations/MaskText';
import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { teamMembers } from '@/lib/data/about-data';

export default function OurTeamPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Meet Our Team' },
  ];

  return (
    <>
      <PageHero
        title="Meet Our Team"
        backgroundImage="/images/about/our-team-hero.jpg?height=400&width=1200"
      />

      <Container className="px-4 py-8 bg-muted">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <MaskText phrases={['The Driving Force Behind Our Success']} />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our team comprises dedicated professionals, engineers, and community
            specialists committed to delivering excellence in every aspect of
            clean energy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <Card
              key={member.id}
              className="border shadow-md border-border bg-surface text-center p-6 flex flex-col items-center"
            >
              <OptimizedImage
                src={member.image || '/placeholder.svg'}
                alt={member.name}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full mb-4 border-4 border-primary/20 shadow-md"
              />
              <h3 className="text-xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-3">{member.position}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {member.bio}
              </p>
              <div className="flex gap-3 mt-auto">
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                )}
                {member.email && (
                  <Link href={`mailto:${member.email}`}>
                    <Mail className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="sr-only">Email</span>
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
