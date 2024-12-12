import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { InputInfo } from "@/types";
import { createClient } from "@/lib/supabase/client";

export const useUserVideos = () => {
  const { user } = useUser();
  const [inputs, setInputs] = useState<InputInfo[]>([]);

  useEffect(() => {
    async function fetchInputs() {
      if (!user?.id) return;

      const supabase = createClient();
      const { data, error } = await supabase
        .from("inputs")
        .select("*")
        .eq("uid", user.id);

      if (error) {
        console.error("Error fetching user inputs:", error);
        return;
      }
      setInputs(data || []);
    }

    fetchInputs();

    const id = setInterval(() => {
      fetchInputs();
    }, 10_000);

    return () => {
      clearInterval(id);
    };
  }, [user?.id]);

  return { inputs };
};
