import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/strapi';
import { getStrapiMediaURL } from '@/lib/strapi';
import { Blog } from '@/types/strapi';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export const revalidate = 300;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const response = await getBlogBySlug(params.slug);
    const blogs: Blog[] = response?.data || [];

    if (blogs.length === 0) {
      notFound();
    }

    const blog = blogs[0];
    const { title, description, content, publishedDate, tags, author, readingTime, featuredImage } = blog.attributes;
    const imageUrl = getStrapiMediaURL(featuredImage?.data?.attributes.url);

    return (
      <div className="bg-gray-50 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
          >
            ← Back to Blog
          </Link>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              {author && <span className="font-semibold">{author}</span>}
              {publishedDate && <span>{formatDate(publishedDate)}</span>}
              {readingTime && <span>• {readingTime} min read</span>}
            </div>

            {description && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-block bg-primary-100 text-primary-700 text-sm px-4 py-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Back to blog link at the bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Blog Post</h2>
          <p className="text-red-600">
            Unable to load this blog post from Strapi. Please ensure Strapi is running and accessible.
          </p>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }
}

