import { isSupabaseConfigured, supabase, type Application } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

async function getApplications(): Promise<{
  applications: Application[];
  count: number;
  error: string | null;
}> {
  if (!isSupabaseConfigured) {
    return {
      applications: [],
      count: 0,
      error:
        ".env.local에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY가 설정되지 않았습니다.",
    };
  }

  const { data, count, error } = await supabase
    .from("applications")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin] failed to load applications", error);
    return { applications: [], count: 0, error: "신청 내역을 불러오지 못했습니다." };
  }

  return { applications: data ?? [], count: count ?? 0, error: null };
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const { applications, count, error } = await getApplications();

  return (
    <main className="flex-1 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">
            신청 내역 관리
          </h1>
          <p className="mt-2 text-sm text-blue-700">
            바이브 AI 교육 신청자 목록입니다.
          </p>
        </div>

        <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm">
          <span className="text-sm font-medium text-slate-500">
            총 신청 인원
          </span>
          <span className="text-2xl font-bold text-blue-600">{count}명</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          {error ? (
            <p className="p-6 text-sm text-red-600">{error}</p>
          ) : applications.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">
              아직 신청 내역이 없습니다.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-blue-50 text-xs font-semibold uppercase tracking-wide text-blue-800">
                  <tr>
                    <th className="px-4 py-3">신청일시</th>
                    <th className="px-4 py-3">이름</th>
                    <th className="px-4 py-3">이메일</th>
                    <th className="px-4 py-3">소속 부서</th>
                    <th className="px-4 py-3">신청 과정</th>
                    <th className="px-4 py-3">하고 싶은 말</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {applications.map((application) => (
                    <tr key={application.id} className="align-top">
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                        {formatDate(application.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {application.name}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {application.email}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {application.department || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                          {application.course}
                        </span>
                      </td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">
                        {application.message || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
