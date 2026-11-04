'use client';

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
    window.open(resource.downloadUrl, '_blank');
  };

  return (
    <div
      className={`group flex h-full flex-col border p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg ${
        featured ? 'border-2 border-primary' : 'border-border'
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className={`p-3 ${categoryColors[resource.category]} rounded-lg`}>
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
        <h3 className="mb-2 text-lg font-extrabold tracking-tight text-foreground line-clamp-2">
          {resource.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {resource.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="mb-4 flex items-center gap-2 text-sm">
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
        className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
        aria-label={`Download ${resource.title}`}
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  );
}
