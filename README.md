# Le Sommet Bleu

오션뷰 숙박 경험을 위한 Le Sommet Bleu 디지털 프로젝트입니다.

## 시작하기

```bash
npm install
npm run dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 검증 명령

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## 환경 변수

Supabase를 연결하려면 `.env.example`을 `.env.local`로 복사하고 프로젝트 URL과 publishable key를 입력합니다.

```bash
cp .env.example .env.local
```

권한이 높은 Supabase service role key는 브라우저 환경 변수에 넣지 않습니다.

## 루트 구조

- `.github/workflows`: GitHub Actions 검증 파이프라인
- `.husky`: 커밋 전 lint-staged 훅
- `public`: 정적 자산
- `src/app`: Next.js App Router 화면
- `src/features`: 인증, 예약, 애니메이션 기능 경계
- `src/lib/supabase`: Supabase 브라우저·서버 클라이언트
- `supabase/migrations`: 데이터베이스 마이그레이션 위치
