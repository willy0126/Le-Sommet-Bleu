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
