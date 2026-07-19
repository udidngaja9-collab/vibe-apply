"use server";

import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export type ApplicationFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const COURSES = ["입문반", "실전반", "심화반"] as const;

export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  if (!isSupabaseConfigured) {
    return {
      status: "error",
      message:
        ".env.local에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다.",
    };
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const email = formData.get("email")?.toString().trim() ?? "";
  const department = formData.get("department")?.toString().trim() ?? "";
  const course = formData.get("course")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";

  if (!name || !email) {
    return { status: "error", message: "이름과 이메일은 필수 입력 항목입니다." };
  }

  if (!COURSES.includes(course as (typeof COURSES)[number])) {
    return { status: "error", message: "신청 과정을 선택해주세요." };
  }

  const { error } = await supabase.from("applications").insert({
    name,
    email,
    department: department || null,
    course,
    message: message || null,
  });

  if (error) {
    console.error("[submitApplication]", error);
    return {
      status: "error",
      message: "신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { status: "success" };
}
