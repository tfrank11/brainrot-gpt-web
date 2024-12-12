import { Button, RadioButton } from "@react95/core";
import Image from "next/image";
import React, { useState } from "react";
import mcPreview from "../../public/minecraft-preview.png";
import subwayPreview from "../../public/subway-preview.png";
import { VideoType } from "@/types";

interface Props {
  onSubmit: (videoType: VideoType) => void;
}

const VideoTypePicker: React.FC<Props> = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState<VideoType>(
    VideoType.MINECRAFT
  );

  return (
    <div className="">
      <div className="text-xl flex justify-around">Select video format</div>
      <div className="flex gap-20 mx-auto px-10 py-3">
        <div
          className={`flex flex-col gap-4 cursor-pointer  ${
            selectedType === VideoType.MINECRAFT ? "grayscale-0" : "grayscale"
          }`}
          onClick={() => {
            setSelectedType(VideoType.MINECRAFT);
          }}
        >
          <Image
            src={mcPreview.src}
            alt={"Minecraft screenshot"}
            width={120}
            height={500}
          />
          <RadioButton
            checked={selectedType === VideoType.MINECRAFT}
            onChange={() => {
              setSelectedType(VideoType.MINECRAFT);
            }}
          >
            <span className="relative bottom-1">Minecraft Parkour</span>
          </RadioButton>
        </div>
        <div
          className={`flex flex-col gap-4 cursor-pointer  ${
            selectedType === VideoType.SUBWAYSURFER
              ? "grayscale-0"
              : "grayscale"
          }`}
          onClick={() => {
            setSelectedType(VideoType.SUBWAYSURFER);
          }}
        >
          <Image
            className="object-contain"
            src={subwayPreview.src}
            alt="subway surfers screenshot"
            width={120}
            height={500}
          />
          <RadioButton
            checked={selectedType === VideoType.SUBWAYSURFER}
            onChange={() => {
              setSelectedType(VideoType.SUBWAYSURFER);
            }}
          >
            <span className="relative bottom-1">Subway Surfers</span>
          </RadioButton>
        </div>
      </div>
      <div className="flex ">
        <Button
          className="mx-auto"
          onClick={() => {
            onSubmit(selectedType);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VideoTypePicker;
