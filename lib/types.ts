// Core business types
export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  capacity: string;
  status: 'completed' | 'ongoing' | 'planned';
  images: string[];
  completionDate?: Date;
  client?: string;
  category: 'mini-grid' | 'captive-power' | 'residential' | 'commercial';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  category: 'installation' | 'maintenance' | 'consulting' | 'audit';
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  author: string;
  category: string;
  featuredImage: string;
  tags: string[];
  slug: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  serviceInterest?: string;
}

// Future backend types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'client';
  createdAt: Date;
  lastLogin?: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  publishedAt: Date;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featuredImage?: string;
}
