export interface MediaAsset {
  url: string;
  alternativeText?: string | null;
}

export interface MediaField {
  data: {
    id: number;
    attributes: MediaAsset;
  } | null;
}

export interface IntroductionAttributes {
  fullName: string;
  title: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  summary: string;
  skills?: string[] | null;
  avatar?: MediaField;
}

export interface WorkExperienceAttributes {
  company: string;
  position: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  current?: boolean | null;
  description: string;
  achievements?: string[] | null;
  technologies?: string[] | null;
  order?: number | null;
  companyUrl?: string | null;
}

export interface BlogAttributes {
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: MediaField;
  publishedDate?: string | null;
  tags?: string[] | null;
  author?: string | null;
  readingTime?: number | null;
}

export interface GeneratedProfileAttributes {
  cvUrl?: string | null;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | null;
}

export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta: {
    pagination: Pagination;
  };
}
