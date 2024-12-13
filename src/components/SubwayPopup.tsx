import React from "react";
import { Modal, Video } from "@react95/core";

const SubwayPopup = () => {
  return (
    // @ts-expect-error think its chill
    <Modal
      className="w-fit m-auto"
      type="info"
      title="Im Bored"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal.Content>
        <Video
          name="Video Player"
          w="320px"
          className="text-xs"
          videoProps={{
            src: "https://syjyscgqllcrvyutlqll.supabase.co/storage/v1/object/public/brainrot_source/subway.mp4?t=2024-12-12T13%3A28%3A13.925Z",
          }}
          src={
            "https://syjyscgqllcrvyutlqll.supabase.co/storage/v1/object/public/brainrot_source/subway.mp4?t=2024-12-12T13%3A28%3A13.925Z"
          }
        />
      </Modal.Content>
    </Modal>
  );
};

export default SubwayPopup;
