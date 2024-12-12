import React from "react";
import { Button } from "@react95/core";

interface Props {
  onContinue: () => void;
}

const Landing: React.FC<Props> = ({ onContinue }) => {
  return (
    <div className="px-2 w-full flex flex-col gap-4">
      <div className="text-xl mx-auto font-bold">
        Welcome to Skibidi Studio.
      </div>
      <div className="mx-auto text-md">
        This application turns PDFs into short-form brainrot videos.
      </div>
      <Button className="mx-auto" onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
};

export default Landing;
