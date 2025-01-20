import React, { useMemo, useState } from "react";
import { Explorer101, Folder, Mmsys119 } from "@react95/icons";
import { Modal, TitleBar, Tree } from "@react95/core";
import { useUserVideos } from "@/hooks/useUserVideos";
import VideoPlayer from "./VideoPlayer";
import SubwayPopup from "./SubwayPopup";
import FolderFile from "./FolderFile";

const TopFiles = () => {
  const [isFileBrowserOpen, setIsFileBrowserOpen] = useState(false);
  const { inputs } = useUserVideos();
  const [videoId, setVideoId] = useState("");

  const treeData = useMemo(() => {
    const files = inputs.map((v, i) => {
      return {
        label: v.title,
        id: i,
        icon: <Mmsys119 variant="16x16_4" />,
        onClick: () => {
          setVideoId(v.video_id);
        },
      };
    });
    return files;
  }, [inputs]);

  const [isSubwayOpen, setIsSubwayOpen] = useState(false);

  return (
    <>
      {isSubwayOpen && <SubwayPopup />}
      <div className="flex gap-4 pt-40 pl-20">
        <FolderFile
          name="My Videos"
          onClick={() => {
            setIsFileBrowserOpen(true);
          }}
        />
        <FolderFile
          name="Im Bored"
          onClick={() => {
            setIsSubwayOpen(true);
          }}
        />
        <FolderFile
          name="Source Code"
          onClick={() => {
            window.open(
              "https://github.com/tfrank11/brainrot-gpt-web",
              "_blank"
            );
          }}
        />
        {isFileBrowserOpen && (
          // @ts-expect-error think its chill
          <Modal
            className="w-fit m-auto"
            type="info"
            title="File Manager"
            hasWindowButton
            menu={[{ name: "File" }, { name: "Edit" }, { name: "View" }]}
            icon={<Explorer101 variant="32x32_4" />}
            titleBarOptions={[
              <TitleBar.Close
                key="close"
                onClick={() => setIsFileBrowserOpen(false)}
              />,
            ]}
          >
            <Modal.Content className="w-64 min-h-36">
              <Tree
                data={treeData}
                root={{
                  label: "My Videos",
                  id: -1,
                  icon: <Folder variant="16x16_4" />,
                }}
              />
            </Modal.Content>
          </Modal>
        )}
      </div>
      {videoId && <VideoPlayer videoId={videoId} asModal />}
    </>
  );
};

export default TopFiles;
