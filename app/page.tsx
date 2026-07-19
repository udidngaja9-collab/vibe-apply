"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitApplication, type ApplicationFormState } from "./actions";

const initialState: ApplicationFormState = { status: "idle" };

export default function Home() {
  const [state, formAction, pending] = useActionState(
    submitApplication,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">
            바이브 AI 교육 신청
          </h1>
          <p className="mt-2 text-sm text-blue-700">
            아래 정보를 입력하고 신청해주세요.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-100/50 sm:p-8">
          {state.status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-600">
                ✓
              </div>
              <p className="text-lg font-semibold text-blue-900">
                신청이 완료되었습니다
              </p>
              <p className="text-sm text-slate-500">
                신청해주셔서 감사합니다. 담당자가 확인 후 안내드리겠습니다.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form ref={formRef} action={formAction} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  이름 <span className="text-blue-600">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  이메일 <span className="text-blue-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  소속 부서
                </label>
                <input
                  id="department"
                  name="department"
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="예: 개발팀"
                />
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  신청 과정 <span className="text-blue-600">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  <option value="입문반">입문반</option>
                  <option value="실전반">실전반</option>
                  <option value="심화반">심화반</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  하고 싶은 말
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="궁금한 점이나 전달하고 싶은 내용을 자유롭게 작성해주세요."
                />
              </div>

              {state.status === "error" && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "신청 처리 중..." : "신청하기"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
