'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Home, ArrowLeft, Search, MapPin, Phone, Mail } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simple Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

      <Container className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-lg mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 leading-none select-none">
              404
            </h1>
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto px-6 py-2">
                <Home className="mr-2 w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-6 py-2"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Link href="/services" className="group">
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mb-2 mx-auto">
                    <Search className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm">Services</h4>
                </div>
              </Link>
              
              <Link href="/projects" className="group">
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mb-2 mx-auto">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm">Projects</h4>
                </div>
              </Link>
              
              <Link href="/contact" className="group">
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted border border-border transition-colors">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center mb-2 mx-auto">
                    <Phone className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm">Contact</h4>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm mb-3">Need help?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a href="tel:+2348031234567" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Phone className="w-4 h-4" />
                +234 803 123 4567
              </a>
              <a href="mailto:info@acoblighting.com" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Mail className="w-4 h-4" />
                info@acoblighting.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
