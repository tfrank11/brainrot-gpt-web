import React, { useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@react95/core";
import { useSearchParams } from "next/navigation";

interface Props {
  onBack: () => void;
}

const Login: React.FC<Props> = ({ onBack }) => {
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
      // toast({
      //   title: "Please try again.",
      //   description: "There was an error logging in with Google.",
      //   variant: "destructive",
      // });
    }
  }, [searchParams, supabase.auth]);

  return (
    <div className="px-2 w-full flex flex-col gap-4">
      <div className="mx-auto text-md">Please sign in to get started.</div>
      <div className="flex gap-2 justify-around">
        <Button onClick={onBack}>Back</Button>
        <Button
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
