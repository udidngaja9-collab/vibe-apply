# 바이브 AI 교육 신청 웹앱

Next.js(App Router) + Supabase로 만든 교육 신청 접수 웹앱입니다.

- `/` : 신청 페이지 (이름/이메일/소속 부서/신청 과정/하고 싶은 말)
- `/admin` : 신청 내역을 최신순으로 보여주는 관리자 페이지 (총 신청 인원 표시)

## 1. Supabase 프로젝트 준비

1. [supabase.com](https://supabase.com)에서 프로젝트를 생성합니다.
2. Supabase 대시보드의 **SQL Editor**에서 [`supabase/schema.sql`](supabase/schema.sql) 내용을 실행해 `applications` 테이블과 RLS 정책을 만듭니다.
3. 대시보드의 **Project Settings → API**에서 `Project URL`과 `anon public` 키를 확인합니다.

> ⚠️ `/admin` 페이지는 별도 로그인 없이 접근 가능합니다. 실제 운영에서는 Supabase Auth 등으로 `/admin` 접근을 보호하는 것을 권장합니다.

## 2. 환경변수 설정

`.env.local` 파일에 아래 자리표시자를 실제 값으로 채워주세요.

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. 실행 방법

```bash
npm install   # 최초 1회
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

- 신청 페이지: http://localhost:3000
- 관리자 페이지: http://localhost:3000/admin

배포 전에는 `npm run build && npm run start`로 프로덕션 빌드를 확인하세요.

## 폴더 구조

- `app/page.tsx` : 신청 페이지 UI (클라이언트 컴포넌트)
- `app/actions.ts` : 신청 데이터를 Supabase에 저장하는 서버 액션
- `app/admin/page.tsx` : 신청 내역 목록/합계를 보여주는 관리자 페이지 (서버 컴포넌트)
- `lib/supabaseClient.ts` : Supabase 클라이언트 초기화
- `supabase/schema.sql` : `applications` 테이블 및 RLS 정책 SQL
