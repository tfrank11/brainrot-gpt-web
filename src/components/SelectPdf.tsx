import React from "react";
import { Button } from "@react95/core";
import { useAlertContext } from "./AlertProvider";

interface Props {
  onSelectFile: (file: File) => void;
}

const SelectPdf: React.FC<Props> = ({ onSelectFile }) => {
  const { alert } = useAlertContext();

  return (
    <div className="px-2 w-full flex flex-col gap-4">
      <div className="mx-auto text-md">
        Select a PDF file to turn into brainrot
      </div>
      <div className="flex gap-2 justify-around">
        <Button
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "application/pdf";
            input.onchange = (event) => {
              const file = (event.target as HTMLInputElement).files?.[0];
              if (file?.type !== "application/pdf") {
                alert("Invalid file type");
                return;
              }
              if (file) {
                onSelectFile(file);
              }
            };
            input.click();
          }}
        >
          Choose File
        </Button>
      </div>
    </div>
  );
};

export default SelectPdf;
