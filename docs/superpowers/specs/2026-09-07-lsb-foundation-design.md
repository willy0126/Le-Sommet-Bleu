# Le Sommet Bleu 프로젝트 기반 설계

## 목표

Le Sommet Bleu 프론트엔드 포트폴리오 프로젝트를 위한 실행 가능한 최소 Next.js 기반을 구성한다. 제품 기능을 성급하게 구현하지 않으면서 향후 사용할 기술과 코드 경계를 명확히 드러내는 것이 목적이다.

의존성 관리는 npm을 사용하며 생성된 `package-lock.json`을 Git에 포함한다.

## 범위

프로젝트에 포함할 항목은 다음과 같다.

- React와 TypeScript를 사용하는 Next.js App Router
- Tailwind CSS 설정과 최소한의 전역 디자인 기반
- GSAP, Zustand, React Hook Form, Zod, Supabase 고정 버전 의존성
- 애니메이션, 인증, 예약 기능을 위한 기능 중심 디렉터리
- 환경 변수 예시와 Supabase 클라이언트 경계
- Le Sommet Bleu와 기술 스택을 소개하는 단순한 정적 메인 페이지
- 빈 Supabase 마이그레이션 및 공개 이미지 디렉터리를 유지하기 위한 파일
- 기본 린트, 타입 검사, 테스트 명령

초기 디렉터리는 `src/app`, `src/components`, `src/features`, `src/lib/supabase`, `src/stores`, `src/schemas`, `src/types`로 구성한다. Supabase 작업 공간은 `supabase/migrations`에서 시작하며 정적 자산은 `public`에 둔다.

인증 흐름, 예약 CRUD, 데이터베이스 테이블, RLS 정책, Storage 버킷, 폼 동작, GSAP 애니메이션은 이번 작업에 포함하지 않는다.

## 구조

`src` 아래에 단일 Next.js 프로젝트를 구성한다. 라우트 파일은 `src/app`, 재사용 가능한 표현 컴포넌트는 `src/components`, 향후 제품 기능은 `src/features`에 배치한다. 공용 훅, 스토어, 검증 스키마, 타입, 외부 서비스 클라이언트는 각각 명확한 디렉터리로 분리한다.

Supabase 브라우저 클라이언트와 서버 클라이언트는 `src/lib/supabase` 아래에서 분리한다. 두 클라이언트는 공개 URL과 publishable key 환경 변수만 읽는다. 권한이 높은 비밀 키는 브라우저 코드에 노출하지 않는다.

## 메인 페이지

루트 경로는 완성된 랜딩 페이지가 아닌 절제된 정적 소개 화면으로 구성한다. Le Sommet Bleu 이름, 오션뷰 숙박 경험을 표현하는 짧은 문구, 간결한 기술 스택 목록, 향후 인터랙티브 기능을 추가할 기반이 준비되었다는 안내를 포함한다.

시각 방향은 짙은 남색, 바다 유리색, 따뜻한 아이보리, 넉넉한 여백과 은은한 CSS 분위기를 사용한다. GSAP은 설치하되 이번 단계에서는 사용하지 않는다.

## 검증

Supabase 자격 증명 없이 의존성 설치, 테스트, 린트, TypeScript 검사, 프로덕션 빌드가 모두 성공하면 프로젝트 기반이 유효한 것으로 판단한다.
