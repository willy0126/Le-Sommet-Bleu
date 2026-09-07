# Le Sommet Bleu 프로젝트 기반 구현 계획

> **에이전트 작업자 필수 하위 스킬:** 이 계획을 작업 단위로 구현할 때 `superpowers:subagent-driven-development`(권장) 또는 `superpowers:executing-plans`를 사용한다. 진행 상태는 체크박스(`- [ ]`)로 관리한다.

**목표:** 요청한 기술 스택을 드러내면서도 제품 기능은 포함하지 않는, 실행 및 검증 가능한 Next.js 최소 프로젝트 기반을 만든다.

**구조:** Next.js App Router 프로젝트를 `src` 아래에 구성하고 기능 코드와 공용 코드를 명확히 분리한다. Supabase는 공개 환경 변수 검사와 브라우저·서버 클라이언트 생성 경계만 제공하며, 메인 페이지는 CSS만 사용하는 정적 소개 화면으로 유지한다.

**기술 스택:** Next.js 16.3.4, React 19.2.8, TypeScript 5.9.3, Tailwind CSS 4.3.3, GSAP 3.15.0, Zustand 5.0.15, React Hook Form 7.87.0, Zod 4.5.4, Supabase JS 2.115.0, Supabase SSR 0.12.6, Vitest 4.1.11, npm

**설계 문서:** `docs/superpowers/specs/2026-09-07-lsb-foundation-design.md`

## 전역 제약

- 의존성 관리는 npm을 사용하고 `package-lock.json`을 Git에 포함한다.
- 사용자용 문서와 설명은 한국어로 작성한다. 코드 식별자와 프레임워크 고유 명칭은 영어를 유지한다.
- 인증, 예약 CRUD, 데이터베이스 테이블, RLS 정책, Storage 버킷, 폼 동작, GSAP 애니메이션은 구현하지 않는다.
- 브라우저에 노출되는 Supabase 값은 프로젝트 URL과 publishable key뿐이다.
- Supabase 자격 증명이 없어도 테스트, 린트, 타입 검사, 프로덕션 빌드가 성공해야 한다.

---

### Task 1: Next.js 실행 기반과 검사 도구 구성

**파일:**

- 생성: `package.json`
- 생성: `package-lock.json` (`npm install`로 자동 생성)
- 생성: `.gitignore`
- 생성: `next-env.d.ts`
- 생성: `next.config.ts`
- 생성: `postcss.config.mjs`
- 생성: `eslint.config.mjs`
- 생성: `tsconfig.json`
- 생성: `vitest.config.mjs`

**인터페이스:**

- 입력: Node.js 20.9.0 이상, npm
- 출력: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, `npm test` 명령과 `@/*` 경로 별칭

- [ ] **1단계: 프로젝트 메타데이터와 고정 버전 의존성 선언**

`package.json`을 다음 내용으로 생성한다.

```json
{
  "name": "le-sommet-bleu",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@supabase/ssr": "0.12.6",
    "@supabase/supabase-js": "2.115.0",
    "gsap": "3.15.0",
    "next": "16.3.4",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "7.87.0",
    "zod": "4.5.4",
    "zustand": "5.0.15"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.3.3",
    "@types/node": "20.19.43",
    "@types/react": "19.2.18",
    "@types/react-dom": "19.2.7",
    "eslint": "9.39.5",
    "eslint-config-next": "16.3.4",
    "tailwindcss": "4.3.3",
    "typescript": "5.9.3",
    "vitest": "4.1.11"
  },
  "engines": {
    "node": ">=20.9.0"
  }
}
```

- [ ] **2단계: 프레임워크 설정 파일 생성**

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
};

export default nextConfig;
```

`postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

`next-env.d.ts`:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

- [ ] **3단계: TypeScript와 Vitest 설정 생성**

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

`vitest.config.mjs`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **4단계: ESLint와 Git 제외 규칙 생성**

`eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"]),
]);
```

`.gitignore`:

```gitignore
node_modules/
.next/
out/
coverage/
.env*
!.env.example
*.tsbuildinfo
npm-debug.log*
.vercel/
```

- [ ] **5단계: 의존성 설치 및 잠금 파일 생성**

실행: `npm.cmd install`

예상 결과: 종료 코드 0, `node_modules`와 `package-lock.json` 생성, 의존성 취약점 요약 출력.

- [ ] **6단계: 설정 파일 검증**

실행: `npm.cmd run typecheck`

예상 결과: 애플리케이션 소스가 아직 없더라도 종료 코드 0.

- [ ] **7단계: 작업 1 커밋**

```powershell
git add package.json package-lock.json .gitignore next-env.d.ts next.config.ts postcss.config.mjs eslint.config.mjs tsconfig.json vitest.config.mjs
git commit -m "chore: Next.js 프로젝트 기반 구성"
```

### Task 2: Supabase 환경 변수와 클라이언트 경계 구성

**파일:**

- 생성: `.env.example`
- 생성: `src/lib/supabase/env.test.ts`
- 생성: `src/lib/supabase/env.ts`
- 생성: `src/lib/supabase/client.ts`
- 생성: `src/lib/supabase/server.ts`
- 생성: `supabase/migrations/.gitkeep`

**인터페이스:**

- 입력: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- 출력: `getSupabasePublicEnv(env?: Partial<NodeJS.ProcessEnv>): SupabasePublicEnv`
- 출력: 브라우저용 동기 함수 `createClient()`와 서버용 비동기 함수 `createClient()`

- [ ] **1단계: 환경 변수 검사 실패 테스트 작성**

`src/lib/supabase/env.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { getSupabasePublicEnv } from "./env";

describe("getSupabasePublicEnv", () => {
  it("필수 환경 변수가 없으면 이해하기 쉬운 오류를 던진다", () => {
    expect(() => getSupabasePublicEnv({})).toThrow(
      "Supabase 공개 환경 변수가 설정되지 않았습니다.",
    );
  });

  it("공개 URL과 publishable key를 반환한다", () => {
    expect(
      getSupabasePublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
      }),
    ).toEqual({
      url: "https://example.supabase.co",
      publishableKey: "sb_publishable_example",
    });
  });
});
```

- [ ] **2단계: 테스트가 예상대로 실패하는지 확인**

실행: `npm.cmd test -- src/lib/supabase/env.test.ts`

예상 결과: `./env` 모듈이 없다는 이유로 실패.

- [ ] **3단계: 최소 환경 변수 검사 구현**

`src/lib/supabase/env.ts`:

```ts
export type SupabasePublicEnv = {
  url: string;
  publishableKey: string;
};

export function getSupabasePublicEnv(
  env: Partial<NodeJS.ProcessEnv> = process.env,
): SupabasePublicEnv {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Supabase 공개 환경 변수가 설정되지 않았습니다.");
  }

  return { url, publishableKey };
}
```

- [ ] **4단계: 환경 변수 검사 테스트 통과 확인**

실행: `npm.cmd test -- src/lib/supabase/env.test.ts`

예상 결과: 테스트 2개 통과.

- [ ] **5단계: 브라우저와 서버 클라이언트 생성 함수 구현**

`src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";

import { getSupabasePublicEnv } from "./env";

export function createClient() {
  const { url, publishableKey } = getSupabasePublicEnv();

  return createBrowserClient(url, publishableKey);
}
```

`src/lib/supabase/server.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabasePublicEnv } from "./env";

export async function createClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabasePublicEnv();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component에서는 쿠키 쓰기가 허용되지 않을 수 있습니다.
        }
      },
    },
  });
}
```

- [ ] **6단계: 환경 변수 예시와 마이그레이션 디렉터리 생성**

`.env.example`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your-key
```

빈 `supabase/migrations/.gitkeep` 파일을 생성한다.

- [ ] **7단계: Supabase 경계 타입 검사**

실행: `npm.cmd run typecheck`

예상 결과: 종료 코드 0. 실제 Supabase 자격 증명이나 네트워크 연결은 요구하지 않는다.

- [ ] **8단계: 작업 2 커밋**

```powershell
git add .env.example src/lib/supabase supabase/migrations/.gitkeep
git commit -m "feat: Supabase 클라이언트 기반 추가"
```

### Task 3: 정적 메인 페이지와 확장 디렉터리 구성

**파일:**

- 생성: `src/app/layout.tsx`
- 생성: `src/app/page.tsx`
- 생성: `src/app/globals.css`
- 생성: `src/components/.gitkeep`
- 생성: `src/features/animation/.gitkeep`
- 생성: `src/features/auth/.gitkeep`
- 생성: `src/features/reservations/.gitkeep`
- 생성: `src/hooks/.gitkeep`
- 생성: `src/stores/.gitkeep`
- 생성: `src/schemas/.gitkeep`
- 생성: `src/types/.gitkeep`
- 생성: `public/images/.gitkeep`

**인터페이스:**

- 입력: Next.js 루트 경로 `/`
- 출력: Le Sommet Bleu 소개, 오션뷰 문구, 기술 스택 목록, 프로젝트 준비 상태를 담은 정적 HTML

- [ ] **1단계: 루트 레이아웃 구현**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Le Sommet Bleu",
  description: "바다와 맞닿은 가장 높은 곳에서 만나는 특별한 휴식",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **2단계: 정적 메인 페이지 구현**

`src/app/page.tsx`:

```tsx
const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "GSAP",
  "Zustand",
  "React Hook Form",
  "Zod",
  "Supabase",
  "Vercel",
] as const;

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[var(--ocean-deep)] text-[var(--ivory)]">
      <div aria-hidden="true" className="ocean-glow absolute inset-0 -z-10" />
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <header className="flex items-center justify-between border-b border-white/15 pb-5 text-xs tracking-[0.24em] uppercase">
          <span>Le Sommet Bleu</span>
          <span className="text-white/55">Project Foundation</span>
        </header>

        <div className="max-w-4xl py-20">
          <p className="mb-6 text-xs tracking-[0.36em] text-[var(--sea-glass)] uppercase">
            Immersive Ocean View
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-6xl leading-[0.9] font-light tracking-[-0.04em] sm:text-8xl lg:text-9xl">
            가장 높은 곳에서,
            <br />
            바다와 마주하다.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
            몰입형 오션뷰 경험을 위한 Le Sommet Bleu의 디지털 기반을 시작합니다.
          </p>
        </div>

        <footer className="grid gap-6 border-t border-white/15 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <ul className="flex max-w-3xl flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
            {technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <p className="text-xs tracking-[0.18em] text-[var(--sea-glass)] uppercase">
            Foundation Ready
          </p>
        </footer>
      </section>
    </main>
  );
}
```

- [ ] **3단계: 전역 디자인 토큰과 분위기 구현**

`src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --ocean-deep: #061a25;
  --ocean-mid: #0b3445;
  --sea-glass: #8fc9c5;
  --ivory: #f4f0e6;
  --font-display: "Cormorant Garamond", "Times New Roman", serif;
  --font-body: "Noto Sans KR", "Apple SD Gothic Neo", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--ocean-deep);
}

body {
  margin: 0;
  font-family: var(--font-body), sans-serif;
}

.ocean-glow {
  background:
    radial-gradient(circle at 78% 24%, rgb(63 143 151 / 28%), transparent 30%),
    linear-gradient(145deg, var(--ocean-deep) 18%, var(--ocean-mid) 64%, #0d2731 100%);
}
```

- [ ] **4단계: 향후 확장을 위한 빈 디렉터리 유지 파일 생성**

다음 파일을 빈 파일로 생성한다.

```text
src/components/.gitkeep
src/features/animation/.gitkeep
src/features/auth/.gitkeep
src/features/reservations/.gitkeep
src/hooks/.gitkeep
src/stores/.gitkeep
src/schemas/.gitkeep
src/types/.gitkeep
public/images/.gitkeep
```

- [ ] **5단계: 전체 자동 검증 실행**

다음 명령을 순서대로 실행한다.

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

예상 결과: 모든 명령 종료 코드 0. 빌드는 Supabase 자격 증명을 요구하지 않으며 `/` 정적 페이지를 생성한다.

- [ ] **6단계: 개발 서버 화면 확인**

실행: `npm.cmd run dev`

확인 항목:

- `/`가 오류 없이 열린다.
- 한국어 제목과 기술 스택 9개가 표시된다.
- 모바일과 데스크톱에서 가로 스크롤이 발생하지 않는다.
- 브라우저 콘솔에 hydration 오류가 없다.

- [ ] **7단계: 작업 3 커밋**

```powershell
git add src/app src/components src/features src/hooks src/stores src/schemas src/types public/images/.gitkeep
git commit -m "feat: Le Sommet Bleu 기본 화면 추가"
```
