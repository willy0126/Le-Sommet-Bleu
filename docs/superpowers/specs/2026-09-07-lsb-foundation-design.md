# Le Sommet Bleu Foundation Design

## Goal

Create a minimal, runnable Next.js foundation for the Le Sommet Bleu frontend portfolio project. The foundation should make the intended technology choices visible without implementing product features prematurely.

Use npm for dependency management and commit the generated `package-lock.json`.

## Scope

The project includes:

- Next.js App Router with React and TypeScript
- Tailwind CSS configuration and a small global design foundation
- Pinned dependencies for GSAP, Zustand, React Hook Form, Zod, and Supabase
- Feature-oriented directories for animation, authentication, and reservations
- Environment-variable examples and Supabase client boundaries
- A simple static index page introducing Le Sommet Bleu and its technology stack
- Empty Supabase migration and public image directories preserved with placeholder files
- Basic lint, type-check, and test commands

The initial directories are `src/app`, `src/components`, `src/features`, `src/lib/supabase`, `src/stores`, `src/schemas`, and `src/types`. The Supabase workspace starts with `supabase/migrations`, and static assets live under `public`.

The project does not include authentication flows, reservation CRUD, database tables, RLS policies, storage buckets, form behavior, or GSAP animations.

## Architecture

The application uses a single Next.js project under `src`. Route-level files live in `src/app`; reusable presentation components live in `src/components`; future product behavior is grouped under `src/features`; shared hooks, stores, validation schemas, types, and external-service clients have dedicated directories.

Supabase browser and server clients are separated under `src/lib/supabase`. They read only public URL and publishable-key environment variables. No privileged key is exposed to browser code.

## Index Page

The root route is a restrained static introduction rather than a full landing page. It contains the Le Sommet Bleu name, a short ocean-view hospitality statement, a compact technology-stack list, and a note that the site foundation is ready for future interactive work.

The visual direction uses deep navy, sea-glass blue, warm ivory, generous whitespace, and subtle CSS-only atmosphere. GSAP is installed but intentionally unused at this stage.

## Validation

The foundation is considered valid when dependencies install, tests pass, linting succeeds, TypeScript reports no errors, and the production build completes without requiring Supabase credentials.
