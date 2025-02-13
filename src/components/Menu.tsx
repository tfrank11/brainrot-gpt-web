import { useServerUpload } from "@/hooks/useServerUpload";
import { useUser } from "@/hooks/useUser";
import { Modal } from "@react95/core";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useAlertContext } from "./AlertProvider";
import { VideoType } from "@/types";
import UploadPdf from "./SelectPdf";
import VideoTypePicker from "./VideoTypePicker";
import Landing from "./Landing";
import Loader from "./Loader";
import VideoPlayer from "./VideoPlayer";
import { Appwiz1502 } from "@react95/icons";

enum Step {
  LANDING,
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
    <Suspense>
      {/* @ts-expect-error think its chill */}
      <Modal
        icon={<Appwiz1502 variant="32x32_4" />}
        className="w-fit m-auto left-1/3"
        // tailwind top-x doesnt work here for whatever reason
        style={{ top: "40%" }}
        type="info"
        title="Brainrot GPT Wizard"
      >
        <Modal.Content>
          {step === Step.LANDING && <Landing />}
          {step === Step.UPLOAD_PDF && (
            <UploadPdf
              onSelectFile={(file) => {
                setFile(file);
                setStep(Step.PICK_VIDEO);
              }}
            />
          )}
          {step === Step.PICK_VIDEO && (
            <VideoTypePicker
              onSubmit={onSubmit}
              onBack={() => {
                setStep(Step.UPLOAD_PDF);
              }}
            />
          )}
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
    </Suspense>
  );
};

export default Menu;
