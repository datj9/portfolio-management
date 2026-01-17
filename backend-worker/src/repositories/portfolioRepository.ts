import {
  BlogAttributes,
  GeneratedProfileAttributes,
  IntroductionAttributes,
  MediaField,
  WorkExperienceAttributes,
} from '../types';

interface IntroductionRow {
  id: number;
  full_name: string;
  title: string;
  email: string;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  summary: string;
  skills?: string | null;
  avatar_url?: string | null;
}

interface WorkExperienceRow {
  id: number;
  company: string;
  position: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  current?: number | null;
  description: string;
  achievements?: string | null;
  technologies?: string | null;
  order?: number | null;
  company_url?: string | null;
}

interface BlogRow {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image_url?: string | null;
  published_date?: string | null;
  tags?: string | null;
  author?: string | null;
  reading_time?: number | null;
  published_at?: string | null;
}

interface GeneratedProfileRow {
  id: number;
  cv_url?: string | null;
}

export class PortfolioRepository {
  private database: D1Database;

  constructor(database: D1Database) {
    this.database = database;
  }

  private parseJsonArray<T>(value: string | null | undefined): T[] | null {
    if (!value) {
      return null;
    }

    try {
      const parsedValue = JSON.parse(value);
      return Array.isArray(parsedValue) ? (parsedValue as T[]) : null;
    } catch {
      return null;
    }
  }

  private createMediaField(url: string | null | undefined): MediaField | undefined {
    if (!url) {
      return undefined;
    }

    return {
      data: {
        id: 0,
        attributes: {
          url,
          alternativeText: null,
        },
      },
    };
  }

  async fetchIntroduction(): Promise<IntroductionAttributes & { id: number } | null> {
    const result = await this.database
      .prepare(
        `
        SELECT id, full_name, title, email, phone, location, website, linkedin, github, summary, skills, avatar_url
        FROM introductions
        ORDER BY updated_at DESC
        LIMIT 1
      `,
      )
      .first() as IntroductionRow;

    if (!result) {
      return null;
    }

    const skillsArray = this.parseJsonArray<string>(result.skills);
    const avatarField = this.createMediaField(result.avatar_url);

    return {
      id: result.id,
      fullName: result.full_name,
      title: result.title,
      email: result.email,
      phone: result.phone ?? null,
      location: result.location ?? null,
      website: result.website ?? null,
      linkedin: result.linkedin ?? null,
      github: result.github ?? null,
      summary: result.summary,
      skills: skillsArray,
      avatar: avatarField,
    };
  }

  async fetchWorkExperiences(): Promise<Array<WorkExperienceAttributes & { id: number }>> {
    const query = `
      SELECT id, company, position, location, start_date, end_date, current, description, achievements, technologies, "order", company_url
      FROM work_experiences
      WHERE published_at IS NOT NULL
      ORDER BY start_date DESC, COALESCE("order", 0) DESC
    `;

    const results = await this.database.prepare(query).all() as {results: WorkExperienceRow[]};
    if (!results.results) {
      return [];
    }

    return results.results.map((row) => {
      const achievementsArray = this.parseJsonArray<string>(row.achievements);
      const technologiesArray = this.parseJsonArray<string>(row.technologies);

      return {
        id: row.id,
        company: row.company,
        position: row.position,
        location: row.location ?? null,
        startDate: row.start_date,
        endDate: row.end_date ?? null,
        current: Boolean(row.current),
        description: row.description,
        achievements: achievementsArray,
        technologies: technologiesArray,
        order: row.order ?? 0,
        companyUrl: row.company_url ?? null,
      };
    });
  }

  async fetchBlogs(
    page: number,
    pageSize: number,
  ): Promise<{
    items: Array<BlogAttributes & { id: number }>;
    total: number;
  }> {
    const offset = (page - 1) * pageSize;
    const publishFilter = 'WHERE published_at IS NOT NULL';

    const totalQuery = `
      SELECT COUNT(*) as count
      FROM blogs
      ${publishFilter}
    `;
    const totalResult = await this.database.prepare(totalQuery).first();
    const total = (totalResult?.count ?? 0) as number;

    const itemsQuery = `
      SELECT id, title, slug, description, content, featured_image_url, published_date, tags, author, reading_time, published_at
      FROM blogs
      ${publishFilter}
      ORDER BY COALESCE(published_date, published_at) DESC, id DESC
      LIMIT ? OFFSET ?
    `;

    const { results } = await this.database.prepare(itemsQuery).bind(pageSize, offset).all() as { results: BlogRow[] };
    const items =
      results?.map((row) => {
        const tagsArray = this.parseJsonArray<string>(row.tags);
        const featuredImage = this.createMediaField(row.featured_image_url);

        return {
          id: row.id,
          title: row.title,
          slug: row.slug,
          description: row.description,
          content: row.content,
          featuredImage,
          publishedDate: row.published_date ?? row.published_at ?? null,
          tags: tagsArray,
          author: row.author ?? null,
          readingTime: row.reading_time ?? null,
        };
      }) ?? [];

    return { items, total };
  }

  async fetchBlogBySlug(slug: string): Promise<BlogAttributes & { id: number } | null> {
    const query = `
      SELECT id, title, slug, description, content, featured_image_url, published_date, tags, author, reading_time, published_at
      FROM blogs
      WHERE slug = ? AND published_at IS NOT NULL
      LIMIT 1
    `;

    const result = await this.database.prepare(query).bind(slug).first() as BlogRow;
    if (!result) {
      return null;
    }

    const tagsArray = this.parseJsonArray<string>(result.tags);
    const featuredImage = this.createMediaField(result.featured_image_url);

    return {
      id: result.id,
      title: result.title,
      slug: result.slug,
      description: result.description,
      content: result.content,
      featuredImage,
      publishedDate: result.published_date ?? result.published_at ?? null,
      tags: tagsArray,
      author: result.author ?? null,
      readingTime: result.reading_time ?? null,
    };
  }

  async fetchGeneratedProfile(): Promise<GeneratedProfileAttributes & { id: number } | null> {
    const query = `
      SELECT id, cv_url
      FROM generated_profiles
      ORDER BY updated_at DESC
      LIMIT 1
    `;

    const result = await this.database.prepare(query).first() as GeneratedProfileRow;
    if (!result) {
      return null;
    }

    return {
      id: result.id,
      cvUrl: result.cv_url ?? null,
    };
  }

  async upsertGeneratedProfileUrl(cvUrl: string): Promise<number> {
    const existing = await this.fetchGeneratedProfile();
    if (existing) {
      await this.database
        .prepare('UPDATE generated_profiles SET cv_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .bind(cvUrl, existing.id)
        .run();
      return existing.id;
    }

    const insertResult = await this.database
      .prepare(
        `
        INSERT INTO generated_profiles (cv_url, created_at, updated_at)
        VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `,
      )
      .bind(cvUrl)
      .run();

    return Number(insertResult.meta.last_row_id ?? 0);
  }

  async createContactRequest(payload: {
    name: string;
    email: string;
    company?: string | null;
    subject: string;
    message: string;
  }): Promise<number> {
    const { name, email, company, subject, message } = payload;
    const insertResult = await this.database
      .prepare(
        `
        INSERT INTO contact_requests (name, email, company, subject, message, created_at, updated_at, published_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `,
      )
      .bind(name, email, company ?? null, subject, message)
      .run();

    return Number(insertResult.meta.last_row_id ?? 0);
  }
}
