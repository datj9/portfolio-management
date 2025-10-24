import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/types/strapi';
import { formatDate } from '@/lib/utils';
import { getStrapiMediaURL } from '@/lib/strapi';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const { title, slug, description, publishedDate, tags, readingTime, featuredImage } = blog.attributes;
  const imageUrl = getStrapiMediaURL(featuredImage?.data?.attributes.url);

  return (
    <Link href={`/blog/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
        {imageUrl && (
          <div className="relative h-48 w-full bg-gray-200">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
            {publishedDate && <span>{formatDate(publishedDate)}</span>}
            {readingTime && <span>• {readingTime} min read</span>}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{description}</p>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-block bg-primary-100 text-primary-700 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

