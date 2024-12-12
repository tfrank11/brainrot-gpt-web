import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Button, Video } from "@react95/core";
import React, { useEffect, useState } from "react";
import { useAlertContext } from "./AlertProvider";

interface Props {
  videoId: string;
}

const VideoPlayer: React.FC<Props> = ({ videoId }) => {
  const { user } = useUser();
  const [src, setSrc] = useState("");
  const { alert } = useAlertContext();

  useEffect(() => {
    async function getSrc() {
      const uid = user?.id;
      if (!uid) {
        alert("no user id found");
        return;
      }
      if (!videoId) {
        alert("no video id");
      }
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("videos")
        .createSignedUrl(`${uid}/${videoId}`, 6000);
      if (error) {
        alert(error.message);
        return;
      }
      setSrc(data.signedUrl);
    }
    getSrc();
  }, [user?.id, videoId]);

  return (
    <div className="flex flex-col gap-2">
      <Video
        w="320px"
        className="text-xs"
        videoProps={{
          src,
        }}
        src={src} //this one doesnt seem to work
      />
      <Button>Start Over</Button>
    </div>
  );
};

export default VideoPlayer;
