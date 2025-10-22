import Image from 'next/image';
import Link from 'next/link';
import { getIntroduction, getWorkExperiences, getBlogs } from '@/lib/strapi';
import { getStrapiMediaURL } from '@/lib/strapi';
import { Introduction, StrapiResponse, WorkExperience, Blog } from '@/types/strapi';
import { WorkExperienceCard } from '@/components/WorkExperienceCard';
import { BlogCard } from '@/components/BlogCard';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  try {
    const [introResponse, workExpResponse, blogsResponse] = await Promise.all([
      getIntroduction(),
      getWorkExperiences(),
      getBlogs(1, 3), // Get latest 3 blogs
    ]);

    const introduction: Introduction | null = introResponse?.data || null;
    const workExperiences: WorkExperience[] = workExpResponse?.data || [];
    const blogs: Blog[] = blogsResponse?.data || [];

    if (!introduction) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <p className="text-center text-gray-600">
            No introduction data available. Please add content in Strapi admin.
          </p>
        </div>
      );
    }

    const { fullName, title, email, phone, location, website, linkedin, github, summary, skills, avatar } = introduction.attributes;
    const avatarUrl = getStrapiMediaURL(avatar?.data?.attributes.url);

    return (
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {avatarUrl && (
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                  <Image
                    src={avatarUrl}
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{fullName}</h1>
                <p className="text-xl md:text-2xl mb-6 opacity-95">{title}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                  {email && (
                    <a href={`mailto:${email}`} className="flex items-center gap-2 hover:underline">
                      📧 {email}
                    </a>
                  )}
                  {phone && <span className="flex items-center gap-2">📱 {phone}</span>}
                  {location && <span className="flex items-center gap-2">📍 {location}</span>}
                </div>

                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                      🌐 Website
                    </a>
                  )}
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-primary-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                      💻 GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
            <div 
              className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </div>
        </section>

        {/* Recent Work Experience */}
        {workExperiences.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Recent Experience</h2>
              <Link
                href="/experience"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-6">
              {workExperiences.slice(0, 2).map((experience) => (
                <WorkExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="bg-primary-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-primary-600 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Recent Blog Posts */}
        {blogs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest Blog Posts</h2>
              <Link
                href="/blog"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Content</h2>
          <p className="text-red-600">
            Unable to load content from Strapi. Please ensure Strapi is running and accessible.
          </p>
        </div>
      </div>
    );
  }
}

