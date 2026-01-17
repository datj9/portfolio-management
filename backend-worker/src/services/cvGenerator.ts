import { EnvBindings } from '../bindings';
import { PortfolioRepository } from '../repositories/portfolioRepository';
import { IntroductionAttributes, WorkExperienceAttributes } from '../types';

interface CvGenerationResult {
  html: string;
  publicUrl?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(dateValue: string | null | undefined): string {
  if (!dateValue) {
    return 'Present';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return 'Present';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

function renderList(values: string[] | null | undefined): string {
  if (!values || values.length === 0) {
    return '';
  }

  const items = values.map((value) => `<li>${escapeHtml(value)}</li>`).join('');
  return `<ul>${items}</ul>`;
}

function renderChipList(values: string[] | null | undefined, className: string): string {
  if (!values || values.length === 0) {
    return '';
  }

  return values.map((value) => `<span class="${className}">${escapeHtml(value)}</span>`).join('');
}

function renderRichText(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  return value
    .split('\n')
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`)
    .join('');
}

function renderCompanyName(companyName: string | null | undefined, companyUrl: string | null | undefined): string {
  if (!companyName) {
    return '';
  }

  if (companyUrl) {
    const safeUrl = escapeHtml(companyUrl);
    return `<a href="${safeUrl}" target="_blank" rel="noreferrer">${escapeHtml(companyName)}</a>`;
  }

  return escapeHtml(companyName);
}

function renderCvHtml(introduction: IntroductionAttributes | null, experiences: WorkExperienceAttributes[]): string {
  const headerTitle = introduction ? `${escapeHtml(introduction.fullName)} - ${escapeHtml(introduction.title)}` : 'Curriculum Vitae';
  const fullName = introduction ? escapeHtml(introduction.fullName) : 'Your Name';
  const title = introduction ? escapeHtml(introduction.title) : 'Professional Title';
  const summarySection = introduction?.summary ? renderRichText(introduction.summary) : '';
  const skillsSection = renderChipList(introduction?.skills ?? [], 'skill-chip');

  const experiencesSection = experiences
    .map((experience) => {
      const achievementsMarkup = renderList(experience.achievements);
      const technologiesMarkup = renderChipList(experience.technologies, 'tech-chip');

      return `
        <div class="experience">
          <div class="experience-header">
            <div>
              <h3>${escapeHtml(experience.position)}</h3>
              <div class="company">${renderCompanyName(experience.company, experience.companyUrl ?? null)}</div>
              ${experience.location ? `<div class="location">${escapeHtml(experience.location)}</div>` : ''}
            </div>
            <div class="date-range">${formatDate(experience.startDate)} - ${experience.current ? 'Present' : formatDate(experience.endDate)}</div>
          </div>
          <div class="experience-body">
            ${experience.description ? `<div class="description">${renderRichText(experience.description)}</div>` : ''}
            ${achievementsMarkup ? `<div class="achievements"><h4>Highlights</h4>${achievementsMarkup}</div>` : ''}
            ${technologiesMarkup ? `<div class="technologies"><h4>Technologies</h4>${technologiesMarkup}</div>` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${headerTitle}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background: #f5f7fb;
      color: #1f2937;
      margin: 0;
      padding: 0;
    }
    .page {
      max-width: 900px;
      margin: 24px auto;
      background: #ffffff;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      border-radius: 16px;
      overflow: hidden;
    }
    header {
      background: linear-gradient(135deg, #0ea5e9, #2563eb);
      color: #ffffff;
      padding: 32px;
    }
    header h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      letter-spacing: -0.01em;
    }
    header .title {
      margin: 0 0 12px 0;
      opacity: 0.9;
      font-size: 18px;
    }
    header .contacts {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 14px;
    }
    header .contacts span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.12);
      padding: 6px 10px;
      border-radius: 12px;
    }
    header a { color: #ffffff; text-decoration: none; }
    .content {
      padding: 32px;
      display: grid;
      gap: 32px;
    }
    section h2 {
      margin: 0 0 12px 0;
      font-size: 20px;
      color: #0ea5e9;
      letter-spacing: -0.01em;
    }
    .summary {
      line-height: 1.7;
      color: #374151;
    }
    .skills, .technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .skill-chip, .tech-chip {
      background: #eef2ff;
      color: #4338ca;
      padding: 6px 10px;
      border-radius: 12px;
      font-size: 13px;
    }
    .experience {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      background: #f9fafb;
    }
    .experience-header {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .experience-header h3 {
      margin: 0 0 4px 0;
      font-size: 18px;
      color: #111827;
    }
    .company { color: #0ea5e9; font-weight: 600; }
    .location { color: #6b7280; font-size: 14px; }
    .date-range { color: #6b7280; font-size: 14px; white-space: nowrap; }
    .experience-body { line-height: 1.6; color: #374151; }
    .experience-body h4 { margin: 12px 0 6px 0; font-size: 15px; color: #1f2937; }
    .experience-body ul { padding-left: 18px; margin: 0; }
    footer {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      color: #6b7280;
      background: #f8fafc;
    }
    @media print {
      body { background: #ffffff; }
      .page { box-shadow: none; margin: 0; border-radius: 0; }
      header { border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header>
      <h1>${fullName}</h1>
      <div class="title">${title}</div>
      <div class="contacts">
        ${introduction?.email ? `<span>📧 <a href="mailto:${escapeHtml(introduction.email)}">${escapeHtml(introduction.email)}</a></span>` : ''}
        ${introduction?.phone ? `<span>📱 ${escapeHtml(introduction.phone)}</span>` : ''}
        ${introduction?.location ? `<span>📍 ${escapeHtml(introduction.location)}</span>` : ''}
        ${introduction?.website ? `<span>🌐 <a href="${escapeHtml(introduction.website)}" target="_blank" rel="noreferrer">${escapeHtml(introduction.website)}</a></span>` : ''}
        ${introduction?.linkedin ? `<span>💼 <a href="${escapeHtml(introduction.linkedin)}" target="_blank" rel="noreferrer">LinkedIn</a></span>` : ''}
        ${introduction?.github ? `<span>💻 <a href="${escapeHtml(introduction.github)}" target="_blank" rel="noreferrer">GitHub</a></span>` : ''}
      </div>
    </header>
    <div class="content">
      ${
        summarySection
          ? `<section><h2>Summary</h2><div class="summary">${summarySection}</div></section>`
          : ''
      }
      ${
        skillsSection
          ? `<section><h2>Skills</h2><div class="skills">${skillsSection}</div></section>`
          : ''
      }
      ${
        experiencesSection
          ? `<section><h2>Work Experience</h2>${experiencesSection}</section>`
          : ''
      }
    </div>
    <footer>Generated on ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}</footer>
  </div>
</body>
</html>`;
}

export async function generateCvDocument(
  repository: PortfolioRepository,
  environment: EnvBindings,
): Promise<CvGenerationResult> {
  const introduction = await repository.fetchIntroduction();
  const experiences = await repository.fetchWorkExperiences();
  const html = renderCvHtml(introduction, experiences);

  let publicUrl: string | null = null;
  if (environment.CV_BUCKET) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const prefix = (environment.CV_PUBLIC_PREFIX ?? '/public').replace(/^\/+/, '');
    const objectKey = `${prefix}/cv-${timestamp}.html`;

    await environment.CV_BUCKET.put(objectKey, html, {
      httpMetadata: {
        contentType: 'text/html',
      },
    });

    const baseUrl = environment.PUBLIC_BASE_URL?.replace(/\/+$/, '');
    publicUrl = baseUrl ? `${baseUrl}/${objectKey}` : objectKey;

    await repository.upsertGeneratedProfileUrl(publicUrl);
  }

  return { html, publicUrl };
}
