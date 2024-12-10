import { AlertProps } from "@react95/core/Alert";
import { ModalButtons } from "@react95/core/Modal";
import { useCallback, useMemo, useState } from "react";

interface Rtn {
  alert?: {
    props: AlertProps;
    buttons: ModalButtons[];
  };
}

const LANDING_PROPS: AlertProps = {
  type: "info",
  title: "Skibidi Studio",
  message:
    "Welcome to Skibidi Studio. This application turns PDFs into short-form brainrot videos.",
};

const UPLOAD_PROPS: AlertProps = {
  type: "info",
  title: "Skibidi Studio",
  message: "Upload a PDF file to get started",
};

const LOGIN_PROPS: AlertProps = {
  type: "info",
  title: "Skibidi Studio",
  message: "Please login to your account",
};

enum UploadStep {
  LANDING,
  LOGIN,
  UPLOAD,
  VIDEO_TYPE,
  LOADING,
  DONE,
}

export const useUploadFlow = (): Rtn => {
  const [step, setStep] = useState<UploadStep>(UploadStep.LANDING);

  const alertProps = useMemo<AlertProps | undefined>(() => {
    switch (step) {
      case UploadStep.LANDING:
        return LANDING_PROPS;
      case UploadStep.LOGIN:
        return LOGIN_PROPS;
      case UploadStep.UPLOAD:
        return UPLOAD_PROPS;
      default:
        return undefined;
    }
  }, [step]);

  const onContinue = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const onBack = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const buttons = useMemo<ModalButtons[]>(() => {
    switch (step) {
      case UploadStep.LANDING:
        return [{ value: "Start", onClick: onContinue }];
      case UploadStep.LOGIN:
        return [
          { value: "Back", onClick: onBack },
          {
            value: "Login",
            onClick: async () => {
              //
            },
          },
        ];
      case UploadStep.UPLOAD:
        return [
          { value: "Back", onClick: onBack },
          {
            value: "Upload",
            onClick: () => {
              //
            },
          },
        ];
      default:
        return [];
    }
  }, [onBack, onContinue, step]);

  return { alert: { props: alertProps, buttons } };
};
