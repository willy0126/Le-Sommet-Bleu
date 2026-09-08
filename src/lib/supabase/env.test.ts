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
