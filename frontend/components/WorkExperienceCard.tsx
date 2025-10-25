import { WorkExperience } from "@/types/strapi"
import { formatDate } from "@/lib/utils"
import Markdown from "react-markdown"

interface WorkExperienceCardProps {
  experience: WorkExperience
}

export function WorkExperienceCard({ experience }: WorkExperienceCardProps) {
  const {
    company,
    position,
    location,
    startDate,
    endDate,
    current,
    description,
    achievements,
    technologies,
    companyUrl,
  } = experience.attributes

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{position}</h3>
          {(companyUrl?.length ?? 0) > 0 ? (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-primary-600 font-semibold"
            >
              {company}
            </a>
          ) : (
            <p className="text-lg text-primary-600 font-semibold">{company}</p>
          )}
          {location && <p className="text-sm text-gray-500">{location}</p>}
        </div>
        <div className="text-sm text-gray-600 whitespace-nowrap">
          {formatDate(startDate)} - {current ? "Present" : formatDate(endDate)}
        </div>
      </div>

      <div className="text-gray-700 mb-4 prose prose-sm max-w-none">
        <Markdown>{description}</Markdown>
      </div>

      {achievements && achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Key Achievements:
          </h4>
          <ul className="list-none space-y-2">
            {achievements.map((achievement, achievementIndex) => (
              <li
                key={achievementIndex}
                className="text-sm text-gray-700 pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary-600 before:font-bold"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="inline-flex items-center justify-center bg-secondary-500 text-white text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
