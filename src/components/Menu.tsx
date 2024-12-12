import { useServerUpload } from "@/hooks/useServerUpload";
import { useUser } from "@/hooks/useUser";
import { Modal, Video } from "@react95/core";
import React, { useCallback, useEffect, useState } from "react";
import { useAlertContext } from "./AlertProvider";
import { VideoType } from "@/types";
import UploadPdf from "./SelectPdf";
import VideoTypePicker from "./VideoTypePicker";
import Landing from "./Landing";
import Login from "./Login";
import Loader from "./Loader";
import VideoPlayer from "./VideoPlayer";

enum Step {
  LANDING,
  LOGIN,
  UPLOAD_PDF,
  PICK_VIDEO,
  LOADING,
  VIDEO,
}

const Menu = () => {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(Step.LANDING);
  const onError = useCallback(() => {
    setStep(Step.UPLOAD_PDF);
  }, []);
  const { startUpload, uploadState, videoId, reset } = useServerUpload({
    onError,
  });
  const { user } = useUser();
  const { alert } = useAlertContext();

  useEffect(() => {
    if (user) {
      setStep(Step.UPLOAD_PDF);
    } else {
      setStep(Step.LANDING);
    }
  }, [user]);

  useEffect(() => {
    if (videoId) {
      setStep(Step.VIDEO);
    }
  }, [videoId]);

  const onSubmit = useCallback(
    (videoType: VideoType) => {
      if (!file) {
        alert("No file selected");
        return;
      }
      startUpload(file, videoType);
      setStep(Step.LOADING);
    },
    [file, alert, startUpload]
  );

  return (
    // @ts-expect-error think its chill
    <Modal
      className="w-fit m-auto"
      type="info"
      title="Skibidi Studio"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Modal.Content>
        {step === Step.LANDING && (
          <Landing
            onContinue={() => {
              setStep(Step.LOGIN);
            }}
          />
        )}
        {step === Step.LOGIN && (
          <Login
            onBack={() => {
              setStep(Step.LANDING);
            }}
          />
        )}
        {step === Step.UPLOAD_PDF && (
          <UploadPdf
            onSelectFile={(file) => {
              setFile(file);
              setStep(Step.PICK_VIDEO);
            }}
          />
        )}
        {step === Step.PICK_VIDEO && <VideoTypePicker onSubmit={onSubmit} />}
        {step === Step.LOADING && <Loader uploadState={uploadState} />}
        {step === Step.VIDEO && (
          <VideoPlayer
            videoId={videoId}
            onRestart={() => {
              setStep(Step.UPLOAD_PDF);
              reset();
            }}
          />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default Menu;
