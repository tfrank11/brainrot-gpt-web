import React, { useCallback } from "react";
import { Button } from "@react95/core";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

const Landing: React.FC = () => {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const signInWithGoogle = useCallback(async () => {
    const next = searchParams.get("next");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [searchParams, supabase.auth]);

  return (
    <div className="px-2 w-full flex flex-col gap-4">
      <div className="text-xl mx-auto font-bold">Welcome to Brainrot GPT</div>
      <div className="mx-auto text-md">
        This application turns PDFs into short-form brainrot videos. Login to
        get started.
      </div>
      <Button className="mx-auto" onClick={signInWithGoogle}>
        Login with Google
      </Button>
    </div>
  );
};

export default Landing;
