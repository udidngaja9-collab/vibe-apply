import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    /^https?:\/\//.test(supabaseUrl) &&
    !supabaseUrl.includes("your_supabase_project_url")
);

// .env.local이 아직 실제 값으로 채워지지 않은 상태에서도 빌드/실행이 되도록
// 유효하지 않은 값일 때는 더미 URL로 대체한다. 실제 요청 시에는 isSupabaseConfigured로 안내 메시지를 보여준다.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl! : "https://placeholder.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey! : "placeholder-anon-key"
);

export type Application = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  department: string | null;
  course: string;
  message: string | null;
};
