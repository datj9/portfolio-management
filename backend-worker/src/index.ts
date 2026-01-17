import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { EnvBindings } from './bindings';
import { PortfolioRepository } from './repositories/portfolioRepository';
import { generateCvDocument } from './services/cvGenerator';
import { buildCollectionResponse, buildSingleResponse, createPagination } from './utils/response';
import { isValidEmail, parseInteger } from './utils/validation';

const app = new Hono<{ Bindings: EnvBindings }>();

app.use('*', cors());

app.get('/api/health', (context) => {
  return context.json({ status: 'ok' });
});

app.get('/api/introduction', async (context) => {
  const repository = new PortfolioRepository(context.env.DB);
  const introduction = await repository.fetchIntroduction();

  const responsePayload = introduction
    ? (() => {
        const { id, ...attributes } = introduction;
        return { id, attributes };
      })()
    : null;

  return context.json(buildSingleResponse(responsePayload));
});

app.get('/api/generated-profile', async (context) => {
  const repository = new PortfolioRepository(context.env.DB);
  const generatedProfile = await repository.fetchGeneratedProfile();
  const responsePayload = generatedProfile
    ? (() => {
        const { id, cvUrl } = generatedProfile;
        return { id, attributes: { cvUrl: cvUrl ?? null } };
      })()
    : null;

  return context.json(buildSingleResponse(responsePayload));
});

app.get('/api/work-experiences', async (context) => {
  const repository = new PortfolioRepository(context.env.DB);
  const experiences = await repository.fetchWorkExperiences();
  const items = experiences.map((experience) => {
    const { id, ...attributes } = experience;
    return { id, attributes };
  });

  const pagination = createPagination(items.length, 1, items.length || 1);
  return context.json(buildCollectionResponse(items, pagination));
});

app.get('/api/blogs', async (context) => {
  const repository = new PortfolioRepository(context.env.DB);
  const slugFilter = context.req.query('filters[slug][$eq]') ?? context.req.query('slug');
  const page = parseInteger(context.req.query('pagination[page]') ?? context.req.query('page'), 1);
  const pageSize = parseInteger(
    context.req.query('pagination[pageSize]') ?? context.req.query('pageSize'),
    10,
  );

  if (slugFilter) {
    const blog = await repository.fetchBlogBySlug(slugFilter);
    const responseItems = blog
      ? (() => {
          const { id, ...attributes } = blog;
          return [{ id, attributes }];
        })()
      : [];
    const pagination = createPagination(responseItems.length, 1, responseItems.length || 1);
    return context.json(buildCollectionResponse(responseItems, pagination));
  }

  const { items, total } = await repository.fetchBlogs(page, pageSize);
  const responseItems = items.map((item) => {
    const { id, ...attributes } = item;
    return { id, attributes };
  });

  const pagination = createPagination(total, page, pageSize);
  return context.json(buildCollectionResponse(responseItems, pagination));
});

app.post('/api/contact-requests', async (context) => {
  const repository = new PortfolioRepository(context.env.DB);
  const body = await context.req.json<{ data?: Record<string, unknown> }>().catch(() => ({ data: null }));
  const data = body?.data ?? {};

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const company = typeof data.company === 'string' ? data.company.trim() : null;
  const subject = typeof data.subject === 'string' ? data.subject.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name || !email || !subject || !message) {
    return context.json({ error: { message: 'Missing required fields' } }, 400);
  }

  if (!isValidEmail(email)) {
    return context.json({ error: { message: 'Invalid email format' } }, 400);
  }

  const newId = await repository.createContactRequest({
    name,
    email,
    company,
    subject,
    message,
  });

  return context.json({
    data: {
      id: newId,
      attributes: { name, email, company, subject, message },
    },
    message: 'Contact request submitted successfully',
  });
});

app.post('/api/cv-generator/generate', async (context) => {
  const adminToken = context.env.ADMIN_TOKEN?.trim();
  if (adminToken) {
    const authorizationHeader = context.req.header('Authorization') ?? '';
    const apiKeyHeader = context.req.header('X-API-KEY') ?? '';
    const bearerToken = authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.slice('Bearer '.length).trim()
      : '';

    if (apiKeyHeader !== adminToken && bearerToken !== adminToken) {
      return context.json({ error: 'Unauthorized' }, 401);
    }
  }

  const repository = new PortfolioRepository(context.env.DB);
  const result = await generateCvDocument(repository, context.env);

  return context.json({
    success: true,
    message: 'CV generated successfully',
    data: {
      html: result.html,
      url: result.publicUrl,
    },
  });
});

app.notFound((context) => {
  return context.json({ error: 'Not Found' }, 404);
});

app.onError((error, context) => {
  console.error('Worker error', error);
  return context.json({ error: 'Internal Server Error' }, 500);
});

export default app;
