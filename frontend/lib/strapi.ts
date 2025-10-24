const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

export function getStrapiURL(path: string = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMediaURL(url: string | undefined) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return getStrapiURL(url);
}

async function fetchAPI(path: string, options: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 60, // Revalidate every 60 seconds
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const url = `${STRAPI_API_URL}${path}`;

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Strapi API Error (${response.status}):`, errorText);
      
      if (response.status === 403) {
        throw new Error(
          `Access Forbidden (403): Please set Public role permissions in Strapi admin.\n` +
          `Go to: Settings → Roles → Public → Enable 'find' permissions for all content types.\n` +
          `See PERMISSIONS_SETUP.md for detailed instructions.`
        );
      }
      
      throw new Error(`Failed to fetch from Strapi: ${response.statusText} (${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export async function getIntroduction() {
  return fetchAPI('/introduction?populate=avatar');
}

export async function getWorkExperiences() {
  return fetchAPI('/work-experiences?sort=startDate:desc&populate=*');
}

export async function getBlogs(page: number = 1, pageSize: number = 10) {
  return fetchAPI(`/blogs?sort=publishedDate:desc&populate=featuredImage&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
}

export async function getBlogBySlug(slug: string) {
  return fetchAPI(`/blogs?filters[slug][$eq]=${slug}&populate=featuredImage`);
}

