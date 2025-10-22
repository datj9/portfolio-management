import { getWorkExperiences } from '@/lib/strapi';
import { WorkExperience } from '@/types/strapi';
import { WorkExperienceCard } from '@/components/WorkExperienceCard';

export const metadata = {
  title: 'Work Experience - Portfolio',
  description: 'My professional work experience and career journey',
};

export const revalidate = 60;

export default async function ExperiencePage() {
  try {
    const response = await getWorkExperiences();
    const workExperiences: WorkExperience[] = response?.data || [];

    if (workExperiences.length === 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Work Experience</h1>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600">
              No work experience entries available yet. Please add content in Strapi admin.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h1>
            <p className="text-xl text-gray-600">
              A comprehensive overview of my professional journey and accomplishments
            </p>
          </div>

          <div className="space-y-8">
            {workExperiences.map((experience) => (
              <WorkExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading work experience:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Content</h2>
          <p className="text-red-600">
            Unable to load work experience from Strapi. Please ensure Strapi is running and accessible.
          </p>
        </div>
      </div>
    );
  }
}

