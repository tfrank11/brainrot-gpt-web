import React from "react";
import FolderFile from "./FolderFile";

const BottomFiles = () => {
  return (
    <div className="flex absolute right-10 bottom-20">
      <FolderFile
        onClick={() => {
          window.open(
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
            "_blank"
          );
        }}
        name={"API Keys"}
      />
    </div>
  );
};

export default BottomFiles;
