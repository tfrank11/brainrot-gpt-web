import { createClient } from "@/lib/supabase/client";
import { Button } from "@react95/core";
import React from "react";

const TaskBarList = () => {
  return (
    <div className="flex flex-col">
      <Button
        onClick={() => {
          window.open("https://github.com/tfrank11/brainrot-gpt-web", "_blank");
        }}
      >
        Github - Frontend
      </Button>
      <Button
        onClick={() => {
          window.open(
            "https://github.com/tfrank11/brainrot-gpt-server",
            "_blank"
          );
        }}
      >
        Github - Server
      </Button>
      <Button
        onClick={() => {
          const supabaseClient = createClient();
          supabaseClient.auth.signOut().then(() => {
            location.reload();
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default TaskBarList;
