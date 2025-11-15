'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Resource } from '@/lib/data/resources-data';
import {
  Download,
  FileText,
  Star,
  Building2,
  Sun,
  Zap,
  Battery,
  BookOpen,
  Calculator,
  Award,
} from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Building2,
  Sun,
  Zap,
  Battery,
  BookOpen,
  Calculator,
  Award,
};

export function ResourceCard({ resource, featured }: ResourceCardProps) {
  const Icon = iconMap[resource.icon] || FileText;

  const categoryColors: Record<string, string> = {
    brochures: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    specifications: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    guides: 'bg-green-500/10 text-green-700 dark:text-green-400',
    certifications: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  };

  const fileTypeColors: Record<string, string> = {
    PDF: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    DOC: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    XLSX: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  };

  const handleDownload = () => {
    // In production, this would trigger actual download
    window.open(resource.downloadUrl, '_blank');
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 ${
        featured ? 'border-2 border-primary' : ''
      }`}
    >
      <CardContent className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-lg ${categoryColors[resource.category]}`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          {featured && (
            <Badge className="gap-1">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">
            {resource.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {resource.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <Badge
            variant="secondary"
            className={fileTypeColors[resource.fileType]}
          >
            {resource.fileType}
          </Badge>
          <span className="text-muted-foreground">{resource.fileSize}</span>
        </div>

        {/* Action */}
        <Button
          onClick={handleDownload}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          aria-label={`Download ${resource.title}`}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}
