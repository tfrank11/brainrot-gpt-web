import React from "react";
import { Folder } from "@react95/icons";

interface Props {
  onClick: () => void;
  name: string;
}

const FolderFile: React.FC<Props> = ({ onClick, name }) => {
  return (
    <div className="flex flex-col gap-1 cursor-pointer" onClick={onClick}>
      <Folder className="mx-auto" variant="32x32_4" />
      <div>{name}</div>
    </div>
  );
};

export default FolderFile;
