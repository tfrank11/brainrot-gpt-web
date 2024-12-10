"use client";
import React from "react";
import { ClippyProvider } from "@react95/clippy";
import { Alert, Button, TaskBar } from "@react95/core";
import { useUploadFlow } from "@/hooks/useUploadFlow";
import "@react95/icons/icons.css";

const Desktop = () => {
  const { alert } = useUploadFlow();

  return (
    <ClippyProvider>
      <div>
        {alert && (
          <Alert
            className="w-80"
            {...alert.props}
            onClick={() => {
              //
            }}
            buttons={alert.buttons}
          />
        )}
      </div>
      <TaskBar
        list={
          <div className="flex flex-col">
            <Button
              onClick={() => {
                window.open("https://github.com/tfrank11", "_blank");
              }}
            >
              Github
            </Button>
            <Button
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/timmy-frank-97a867191/",
                  "_blank"
                );
              }}
            >
              Linkedin - Timmy
            </Button>
            <Button
              onClick={() => {
                window.open("https://www.linkedin.com/in/tiara-j/", "_blank");
              }}
            >
              Linkedin - Tiara
            </Button>
          </div>
        }
      />
    </ClippyProvider>
  );
};

export default Desktop;
