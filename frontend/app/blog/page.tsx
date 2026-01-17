import { getBlogs } from '@/lib/strapi';
import { Blog } from '@/types/strapi';
import { BlogCard } from '@/components/BlogCard';
import { IMMEDIATE_REVALIDATE_TIME } from '@/common/constants';

export const metadata = {
  title: 'Dat Nguyen - Blog - Portfolio',
  description: 'Read my latest blog posts and articles',
};

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const revalidate = 1800;;

export default async function BlogPage() {
  try {
    const response = await getBlogs(1, 100); // Get up to 100 blogs
    const blogs: Blog[] = response?.data || [];

    if (blogs.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600">
              No blog posts available yet.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600">
              Insights, tutorials, and thoughts on technology and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blogs:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Content</h2>
          <p className="text-red-600">
            Unable to load blog posts from Strapi. Please ensure Strapi is running and accessible.
          </p>
        </div>
      </div>
    );
  }
}

