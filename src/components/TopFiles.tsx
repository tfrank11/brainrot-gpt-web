import React, { useMemo, useState } from "react";
import { Folder, Mmsys119, Computer4 } from "@react95/icons";
import { Modal, TitleBar, Tree } from "@react95/core";
import { useUserVideos } from "@/hooks/useUserVideos";
import VideoPlayer from "./VideoPlayer";

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
    // return [
    //   {
    //     label: "Desktop",
    //     id: -2,
    //     icon: <Folder variant="16x16_4" />,
    //     children: [
    //       {
    //         label: "My Videos",
    //         id: -1,
    //         children: files,
    //         icon: <Folder variant="16x16_4" />,
    //       },
    //     ],
    //   },
    // ];
  }, [inputs]);

  return (
    <>
      <div className="flex gap-4 pt-40 pl-20">
        <div
          className="flex flex-col gap-1 cursor-pointer"
          onClick={() => {
            window.open(
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
              "_blank"
            );
          }}
        >
          <Folder className="mx-auto" variant="32x32_4" />
          <div>API Keys</div>
        </div>
        <div
          className="flex flex-col gap-1 cursor-pointer"
          onClick={() => {
            setIsFileBrowserOpen(true);
          }}
        >
          <Folder className="mx-auto" variant="32x32_4" />
          <div>My Videos</div>
        </div>
        {isFileBrowserOpen && (
          // @ts-expect-error think its chill
          <Modal
            className="w-fit m-auto"
            type="info"
            title="File Explorer"
            hasWindowButton
            menu={[{ name: "File" }, { name: "Edit" }, { name: "View" }]}
            titleBarOptions={[
              <TitleBar.Close
                key="close"
                onClick={() => setIsFileBrowserOpen(false)}
              />,
            ]}
          >
            <Modal.Content className="w-64 h-36">
              <Tree
                data={treeData}
                // root={{
                //   id: -3,
                //   label: "My Computer",
                //   icon: <Computer4 variant="16x16_4" />,
                // }}
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
      {videoId && <VideoPlayer videoId={videoId} />}
    </>
  );
};

export default TopFiles;
