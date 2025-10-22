'use client';

import { useState, useEffect, useRef } from 'react';
import { getStrapiURL } from '@/lib/strapi';

export default function CVPage() {
  const [cvError, setCvError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const cvUrl = getStrapiURL('/cv.html');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Check if CV exists and is accessible
    const checkCV = async () => {
      try {
        const response = await fetch(cvUrl, {
          method: 'HEAD',
          credentials: 'include',
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            setCvError('CV file not found. Please add content in Strapi to generate your CV.');
          } else {
            setCvError(`Failed to load CV (HTTP ${response.status})`);
          }
        } else {
          setCvError(null);
        }
      } catch (error) {
        setCvError('Unable to connect to Strapi backend. Make sure it is running.');
      } finally {
        setIsLoading(false);
      }
    };

    checkCV();
  }, [cvUrl]);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Dynamically import html2pdf.js (client-side only)
      const html2pdf = (await import('html2pdf.js')).default;
      
      // Fetch the CV HTML content
      const response = await fetch(cvUrl);
      const htmlContent = await response.text();
      
      // Parse the HTML to extract styles and content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Extract styles
      const styles = doc.querySelector('style')?.innerHTML || '';
      
      // Extract container content
      const container = doc.querySelector('.container');
      
      if (!container) {
        throw new Error('CV container not found');
      }
      
      // Create a wrapper div with embedded styles
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <style>${styles}</style>
        ${container.outerHTML}
      `;
      
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const day = currentTime.getDate();
      // Configure PDF options
      const options = {
        margin: 0,
        filename: `CV_${year}${month}${day}.pdf`,
        image: { type: 'jpeg' as 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        }
      };
      
      // Generate and download PDF
      // @ts-ignore - html2pdf types are incomplete
      await html2pdf().set(options).from(wrapper).save();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try "Open in New Tab" and use browser print instead.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Curriculum Vitae</h1>
            <p className="text-xl text-gray-600">
              View or download my professional CV
            </p>
          </div>
          {!cvError && !isLoading && (
            <div className="flex gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition whitespace-nowrap flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition whitespace-nowrap flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </a>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading CV...</p>
          </div>
        ) : cvError ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">
              ⚠️ {cvError}
            </h2>
            <div className="bg-white rounded p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">How to generate your CV:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Go to Strapi Admin: <a href="http://localhost:1337/admin" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">http://localhost:1337/admin</a></li>
                <li>
                  Add content:
                  <ul className="list-disc list-inside ml-6 mt-1 text-sm">
                    <li><strong>Introduction</strong>: Add your personal info (single entry)</li>
                    <li><strong>Work Experiences</strong>: Add at least one job</li>
                    <li><strong>Blog</strong>: Optional - add blog posts</li>
                  </ul>
                </li>
                <li>Make sure all content is <strong>Published</strong> (not Draft)</li>
                <li>The CV will be generated automatically</li>
                <li>Refresh this page to view your CV</li>
              </ol>
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
              <p className="font-semibold mb-2">💡 Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>CV automatically regenerates when you update content</li>
                <li>Only <strong>published</strong> content appears in your CV</li>
                <li>Check Strapi logs if CV doesn't generate</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Embedded CV */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
              <iframe
                ref={iframeRef}
                src={cvUrl}
                className="w-full h-full border-0"
                title="Curriculum Vitae"
              />
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p className="mt-4 text-gray-400 text-xs">
                💡 Tip: Click "Download PDF" to save your CV as a PDF file directly to your computer.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

