import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Button, Modal, Video } from "@react95/core";
import React, { useEffect, useState } from "react";
import { useAlertContext } from "./AlertProvider";
import { Appwiz1502 } from "@react95/icons";

interface Props {
  videoId: string;
  onRestart?: () => void;
  asModal?: boolean;
}

const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    // @ts-expect-error its aight
    <Modal
      icon={<Appwiz1502 variant="32x32_4" />}
      className="w-fit m-auto left-1/2"
      // top-1/2 doesnt work here for some reason
      style={{ top: "50%" }}
      type="info"
      title="Video Player"
    >
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

const VideoPlayer: React.FC<Props> = ({ videoId, onRestart, asModal }) => {
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
  }, [user?.id, videoId, alert]);

  const component = (
    <div className="flex flex-col gap-2">
      {src && (
        <Video
          name=" "
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
        {src && (
          <Button
            onClick={() => {
              const link = document.createElement("a");
              link.target = "_blank";
              link.href = src;
              link.download = `${videoId}.mp4`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download
          </Button>
        )}
      </div>
    </div>
  );

  return asModal ? <ModalWrapper>{component}</ModalWrapper> : component;
};

export default VideoPlayer;
