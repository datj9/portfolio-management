export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function stripHTML(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

