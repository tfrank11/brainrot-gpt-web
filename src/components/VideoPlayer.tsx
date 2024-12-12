import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Button, Video } from "@react95/core";
import React, { useEffect, useState } from "react";
import { useAlertContext } from "./AlertProvider";

interface Props {
  videoId: string;
  onRestart?: () => void;
}

const VideoPlayer: React.FC<Props> = ({ videoId, onRestart }) => {
  const { user } = useUser();
  const [src, setSrc] = useState("");
  const { alert } = useAlertContext();

  useEffect(() => {
    async function getSrc() {
      const uid = user?.id;
      if (!uid) {
        return;
      }
      if (!videoId) {
        return;
      }
      const supabase = createClient();
      const path = `${uid}/${videoId}.mp4`;
      const { data, error } = await supabase.storage
        .from("videos")
        .createSignedUrl(path, 60 * 60 * 24);
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
      {src && (
        <Video
          name="Video Player"
          w="320px"
          className="text-xs"
          videoProps={{
            src,
          }}
          src={src}
        />
      )}
      <div className="flex gap-2 justify-around">
        {onRestart && (
          <Button
            onClick={() => {
              onRestart();
            }}
          >
            Start Over
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
