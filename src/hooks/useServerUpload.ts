import {
  IServerReponse,
  IServerRequest,
  ServerRequestType,
  ServerResponseType,
  VideoType,
} from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { isNil } from "lodash-es";
import { useUser } from "./useUser";
import { createClient } from "@/lib/supabase/client";
import { v4 } from "uuid";
import { useAlertContext } from "@/components/AlertProvider";

const WEBSOCKET_SERVER_HOST =
  "wss://supabase-hackathon-brainrot-6fdcf6947d5b.herokuapp.com/ws";

export const useServerUpload = () => {
  const { user, session } = useUser();
  const [uploadState, setUploadState] = useState<ServerResponseType | null>(
    null
  );
  const wsRef = useRef<WebSocket | null>(null);
  const [videoId, setVideoId] = useState("");
  const { alert } = useAlertContext();

  const bootstrap = useCallback(() => {
    wsRef.current = new WebSocket(WEBSOCKET_SERVER_HOST);
    setVideoId("");
    const onmessage = (ev: MessageEvent) => {
      const data = JSON.parse(ev.data) as IServerReponse;
      if (!data || isNil(data.type)) {
        return;
      }
      setUploadState(data.type);
      if (data.type === ServerResponseType.VIDEO_DONE) {
        setVideoId(data.video_id);
      }
    };

    wsRef.current.onmessage = onmessage;
    wsRef.current.onerror = console.warn;
  }, []);

  const uploadFile = useCallback(
    async (file: File, pdfId: string) => {
      const uid = user?.id;
      if (!uid) {
        throw "No uid found";
      }
      const supabase = createClient();
      const { error } = await supabase.storage
        .from("docs")
        .upload(`${uid}/${pdfId}.pdf`, file);
      if (error) {
        throw error;
      }
    },
    [user]
  );

  const submitPdf = useCallback(
    (pdfId: string, videoType: VideoType) => {
      const uid = user?.id;
      if (!uid) {
        throw "No uid found";
      }
      const token = session?.access_token;
      if (!token) {
        throw "No jwt found";
      }
      const message: IServerRequest = {
        type: ServerRequestType.LOGIN,
        token,
        pdf_id: pdfId,
        video_type: videoType,
      };
      wsRef.current?.send(JSON.stringify(message));
    },
    [user, session?.access_token]
  );

  const startUpload = useCallback(
    async (file: File, videoType: VideoType) => {
      try {
        const pdfId = v4();
        await uploadFile(file, pdfId);
        submitPdf(pdfId, videoType);
      } catch (err) {
        alert(typeof err === "object" ? JSON.stringify(err) : String(err));
      }
    },
    [alert, uploadFile, submitPdf]
  );

  useEffect(() => {
    bootstrap();

    return () => {
      wsRef.current?.close();
    };
  }, [bootstrap]);

  return {
    startUpload,
    uploadState,
    videoId,
  };
};
