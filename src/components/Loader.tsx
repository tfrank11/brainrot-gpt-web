import { ServerResponseType } from "@/types";
import Image from "next/image";
import React, { useMemo } from "react";

interface Props {
  uploadState: ServerResponseType | null;
}

const Loader: React.FC<Props> = ({ uploadState }) => {
  const loadingText = useMemo(() => {
    switch (uploadState) {
      case null:
        return "Uploading PDF";
      case ServerResponseType.LOGIN_OK:
        return "Transcribing PDF";
      case ServerResponseType.TRANSCRIPT:
        return "Generating AI Summary";
      case ServerResponseType.SUMMARY:
        return "Creating AI Voiceover";
      case ServerResponseType.AUDIO_DONE:
        return "Generating Captions";
      case ServerResponseType.WORD_TIMINGS_DONE:
        return "Processing Final Video";
      case ServerResponseType.PROCESS_VIDEO_DONE:
        return "Uploading to Supabase";
      case ServerResponseType.VIDEO_DONE:
      case ServerResponseType.ERROR:
      default:
        return "";
    }
  }, [uploadState]);

  return (
    <div className="w-48 flex flex-col text-center">
      <div className="mx-auto">{loadingText}...</div>
      <div className="mx-auto">
        <Image
          src={"https://react95.io/static/media/hourglass.7a7a26ab.gif"}
          alt={"hourglass loading icon"}
          width={80}
          height={100}
        />
      </div>
      <div className="mx-auto text-[10px]">
        This should take 1 - 1.5 minutes
      </div>
    </div>
  );
};

export default Loader;
