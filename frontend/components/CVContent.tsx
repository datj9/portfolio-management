"use client"

import { useState } from "react"
import { Introduction, WorkExperience } from "@/types/strapi"
import { getStrapiURL } from "@/lib/strapi"

interface CVContentProps {
  introduction: Introduction
  workExperiences: WorkExperience[]
}

export default function CVContent({
  introduction,
  workExperiences,
}: CVContentProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const {
    fullName,
    title,
    email,
    phone,
    location,
    website,
    linkedin,
    github,
    summary,
    skills,
    cvUrl: savedCvUrl,
  } = introduction.attributes
  const cvUrl = savedCvUrl || getStrapiURL("/cv.html")

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      // Use the cv.html for PDF generation
      const html2pdf = (await import("html2pdf.js")).default
      const response = await fetch(cvUrl)
      const htmlContent = await response.text()

      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlContent, "text/html")
      const styles = doc.querySelector("style")?.innerHTML || ""
      const container = doc.querySelector(".container")

      if (!container) {
        throw new Error("CV container not found")
      }

      const wrapper = document.createElement("div")
      wrapper.innerHTML = `
        <style>${styles}</style>
        ${container.outerHTML}
      `

      const currentTime = new Date()
      const year = currentTime.getFullYear()
      const month = String(currentTime.getMonth() + 1).padStart(2, "0")
      const day = String(currentTime.getDate()).padStart(2, "0")

      const options = {
        margin: 0,
        filename: `CV_${year}${month}${day}.pdf`,
        image: { type: "jpeg" as "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      }

      // @ts-ignore
      await html2pdf().set(options).from(wrapper).save()
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header with Actions */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Curriculum Vitae
            </h1>
            <p className="text-xl text-gray-600">
              View or download my professional CV
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition whitespace-nowrap flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </>
              )}
            </button>

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition whitespace-nowrap flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>

        {/* CV Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8 pb-6 border-b-2 border-primary-600">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {fullName}
            </h1>
            <p className="text-2xl text-primary-600 mb-4">{title}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {email && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {email}
                </span>
              )}
              {phone && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {phone}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {location}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  🌐 Website
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  💼 LinkedIn
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  💻 GitHub
                </a>
              )}
            </div>
          </header>

          {/* Summary */}
          {summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Professional Summary
              </h2>
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {workExperiences.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Work Experience
              </h2>
              <div className="space-y-6">
                {workExperiences.map((exp) => {
                  const {
                    company,
                    position,
                    startDate,
                    endDate,
                    current,
                    location: expLocation,
                    description,
                    achievements,
                    technologies,
                  } = exp.attributes

                  return (
                    <div
                      key={exp.id}
                      className="border-l-4 border-primary-600 pl-4"
                    >
                      <h3 className="text-xl font-bold text-gray-900">
                        {position}
                      </h3>
                      <p className="text-lg text-primary-600 font-semibold">
                        {company}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatDate(startDate)} -{" "}
                        {current ? "Present" : formatDate(endDate!)}
                        {expLocation && ` • ${expLocation}`}
                      </p>

                      {description && (
                        <div
                          className="text-gray-700 mb-3 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: description }}
                        />
                      )}

                      {achievements && achievements.length > 0 && (
                        <div className="mb-3">
                          <p className="font-semibold text-gray-900 mb-2">
                            Key Achievements:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {achievements.map(
                              (achievement, achievementIndex) => (
                                <li key={achievementIndex}>{achievement}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {technologies && technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
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
                })}
              </div>
            </section>
          )}

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>
              Generated on{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </footer>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="text-gray-400 text-xs">
            💡 This CV is automatically regenerated every 60 seconds and when
            content is updated in Strapi.
          </p>
        </div>
      </div>
    </div>
  )
}
