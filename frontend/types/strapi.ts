export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Introduction {
  id: number;
  attributes: {
    fullName: string;
    title: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
    skills?: string[];
    cvUrl?: string;
    avatar?: {
      data: StrapiImage | null;
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface WorkExperience {
  id: number;
  attributes: {
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements?: string[];
    technologies?: string[];
    order: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Blog {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content: string;
    publishedDate?: string;
    tags?: string[];
    author?: string;
    readingTime?: number;
    featuredImage?: {
      data: StrapiImage | null;
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ContactRequest {
  id: number;
  attributes: {
    name: string;
    email: string;
    company?: string;
    subject: string;
    message: string;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
  };
}

