import {
  getGeneratedProfile,
  getIntroduction,
  getWorkExperiences,
} from "@/lib/strapi"
import { GeneratedProfile, Introduction, WorkExperience } from "@/types/strapi"
import CVContent from "@/components/CVContent"
import { IMMEDIATE_REVALIDATE_TIME } from "@/common/constants"

export const revalidate = IMMEDIATE_REVALIDATE_TIME

export default async function CVPage() {
  try {
    const [introResponse, workExpResponse, generatedProfileResponse] =
      await Promise.all([
        getIntroduction(),
        getWorkExperiences(),
        getGeneratedProfile(),
      ])

    const introduction: Introduction | null = introResponse?.data || null
    const workExperiences: WorkExperience[] = workExpResponse?.data || []
    const generatedProfile: GeneratedProfile | null =
      generatedProfileResponse?.data || null

    if (!introduction) {
      return (
        <div className="bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-800 mb-4">
                ⚠️ CV Not Available
              </h2>
              <div className="bg-white rounded p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">
                  How to generate your CV:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>
                    Go to Strapi Admin:{" "}
                    <a
                      href="http://localhost:1337/admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      http://localhost:1337/admin
                    </a>
                  </li>
                  <li>
                    Add content:
                    <ul className="list-disc list-inside ml-6 mt-1 text-sm">
                      <li>
                        <strong>Introduction</strong>: Add your personal info
                        (single entry)
                      </li>
                      <li>
                        <strong>Work Experiences</strong>: Add at least one job
                        and publish it
                      </li>
                    </ul>
                  </li>
                  <li>
                    Make sure all content is <strong>Published</strong> (not
                    Draft)
                  </li>
                  <li>Refresh this page after adding content</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <CVContent
        introduction={introduction}
        workExperiences={workExperiences}
        generatedProfile={generatedProfile}
      />
    )
  } catch (error) {
    console.error("Error loading CV:", error)
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              ⚠️ Error Loading CV
            </h2>
            <p className="text-red-600 mb-4">
              Unable to load CV content from Strapi. Please ensure Strapi is
              running and accessible.
            </p>
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              → Go to Strapi Admin
            </a>
          </div>
        </div>
      </div>
    )
  }
}
