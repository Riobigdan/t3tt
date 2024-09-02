"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { env } from "~/env";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST!,
    person_profiles: "always",
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWarpper>{children}</PostHogAuthWarpper>
    </PostHogProvider>
  );
}

export function PostHogAuthWarpper({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const userInfo = useUser();

  useEffect(() => {
    if (userInfo.user) {
      console.log("🐛 ~ file: providers.tsx:30 ~ userInfo:", userInfo);
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses?.[0]?.emailAddress,
        name: userInfo.user.fullName,
      });
    } else if (!auth.isSignedIn) {
      posthog.reset();
    }
  }, [auth, userInfo]);

  return children;
}
