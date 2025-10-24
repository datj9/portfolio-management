'use strict';

const fs = require('fs');
const path = require('path');

/**
 * cv-generator service
 */

module.exports = () => ({
  /**
   * Generate CV HTML from Strapi content
   */
  async generateCV() {
    try {
      // Fetch all content
      const introduction = await strapi.entityService.findMany(
        'api::introduction.introduction',
        {
          populate: ['avatar'],
        }
      );

      const workExperiences = await strapi.entityService.findMany(
        'api::work-experience.work-experience',
        {
          filters: {
            publishedAt: {
              $notNull: true,
            },
          },
          sort: { startDate: 'desc' },
        }
      );

      // Generate HTML
      const html = this.generateHTMLTemplate(introduction, workExperiences);

      // Save to public folder
      const publicPath = path.join(strapi.dirs.static.public, 'cv.html');
      fs.writeFileSync(publicPath, html, 'utf8');

      return {
        success: true,
        path: publicPath,
        url: '/cv.html',
      };
    } catch (error) {
      strapi.log.error('CV generation failed:', error);
      throw error;
    }
  },

  /**
   * Generate HTML template
   */
  generateHTMLTemplate(introduction, workExperiences) {
    const formatDate = (dateString) => {
      if (!dateString) return 'Present';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    const stripHTML = (html) => {
      if (!html) return '';
      return html.replace(/<[^>]*>/g, '');
    };

    const renderSkills = (skills) => {
      if (!skills || !Array.isArray(skills)) return '';
      return skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    };

    const renderList = (items) => {
      if (!items || !Array.isArray(items)) return '';
      return items.map(item => `<li>${item}</li>`).join('');
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${introduction?.fullName || 'CV'} - Curriculum Vitae</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            margin-bottom: 0;
        }
        
        header {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }
        
        header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        header .title {
            font-size: 1.3em;
            opacity: 0.95;
            margin-bottom: 20px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
            font-size: 0.95em;
        }
        
        .contact-info a {
            color: white;
            text-decoration: none;
            opacity: 0.95;
        }
        
        .contact-info a:hover {
            opacity: 1;
            text-decoration: underline;
        }
        
        .content {
            padding: 40px;
        }
        
        section {
            margin-bottom: 40px;
        }
        
        h2 {
            color: #0284c7;
            font-size: 1.8em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #0284c7;
        }
        
        .summary {
            font-size: 1.1em;
            color: #555;
            line-height: 1.8;
        }
        
        .experience-item {
            margin-bottom: 30px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
            border-left: 4px solid #0284c7;
        }
        
        .experience-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
            flex-wrap: wrap;
        }
        
        .experience-title {
            flex: 1;
        }
        
        .experience-title h3 {
            color: #333;
            font-size: 1.3em;
            margin-bottom: 5px;
        }
        
        .company {
            color: #0284c7;
            font-weight: 600;
            font-size: 1.1em;
        }
        
        .location {
            color: #888;
            font-size: 0.95em;
        }
        
        .date-range {
            color: #666;
            font-size: 0.95em;
            white-space: nowrap;
        }
        
        .description {
            margin-top: 15px;
            color: #555;
            line-height: 1.7;
        }
        
        .achievements, .technologies {
            margin-top: 15px;
        }
        
        .achievements ul, .technologies ul {
            list-style: none;
            padding-left: 0;
        }
        
        .achievements li {
            padding-left: 20px;
            position: relative;
            margin-bottom: 8px;
            color: #555;
        }
        
        .achievements li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #0284c7;
            font-weight: bold;
        }
        
        .skill-tag, .tech-tag {
            display: inline-block;
            background: #0284c7;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.85em;
            margin: 5px 5px 5px 0;
        }
        
        .tech-tag {
            background: #0369a1;
        }
        
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 0.9em;
            margin: 0;
        }
        
        footer p {
            margin: 0;
        }
        
        @media print {
            body {
                background: white;
            }
            
            .container {
                box-shadow: none;
            }
            
            .experience-item {
                page-break-inside: avoid;
            }
        }
        
        @media (max-width: 768px) {
            header {
                padding: 40px 20px;
            }
            
            header h1 {
                font-size: 2em;
            }
            
            .content {
                padding: 20px;
            }
            
            .experience-header {
                flex-direction: column;
            }
            
            .date-range {
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>${introduction?.fullName || ''}</h1>
            <div class="title">${introduction?.title || ''}</div>
            <div class="contact-info">
                ${introduction?.email ? `<span>📧 <a href="mailto:${introduction.email}">${introduction.email}</a></span>` : ''}
                ${introduction?.phone ? `<span>📱 ${introduction.phone}</span>` : ''}
                ${introduction?.location ? `<span>📍 ${introduction.location}</span>` : ''}
                ${introduction?.website ? `<span>🌐 <a href="${introduction.website}" target="_blank">${introduction.website}</a></span>` : ''}
                ${introduction?.linkedin ? `<span>💼 <a href="${introduction.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
                ${introduction?.github ? `<span>💻 <a href="${introduction.github}" target="_blank">GitHub</a></span>` : ''}
            </div>
        </header>
        
        <div class="content">
            ${introduction?.summary ? `
            <section class="summary-section">
                <h2>Summary</h2>
                <div class="summary">${stripHTML(introduction.summary)}</div>
            </section>
            ` : ''}
            
            ${introduction?.skills ? `
            <section class="skills-section">
                <h2>Skills</h2>
                <div class="skills">
                    ${renderSkills(introduction.skills)}
                </div>
            </section>
            ` : ''}
            
            ${workExperiences && workExperiences.length > 0 ? `
            <section class="experience-section">
                <h2>Work Experience</h2>
                ${workExperiences.map(exp => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <div class="experience-title">
                                <h3>${exp.position || ''}</h3>
                                <div class="company">${exp.company || ''}</div>
                                ${exp.location ? `<div class="location">${exp.location}</div>` : ''}
                            </div>
                            <div class="date-range">
                                ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                            </div>
                        </div>
                        ${exp.description ? `<div class="description">${stripHTML(exp.description)}</div>` : ''}
                        ${exp.achievements && Array.isArray(exp.achievements) && exp.achievements.length > 0 ? `
                            <div class="achievements">
                                <ul>
                                    ${renderList(exp.achievements)}
                                </ul>
                            </div>
                        ` : ''}
                        ${exp.technologies && Array.isArray(exp.technologies) && exp.technologies.length > 0 ? `
                            <div class="technologies">
                                ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </section>
            ` : ''}
        </div>
        
        <footer>
            <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </footer>
    </div>
</body>
</html>`;
  },
});

