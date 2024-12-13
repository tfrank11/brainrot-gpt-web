"use client";
import React from "react";
import { ClippyProvider } from "@react95/clippy";
import { TaskBar } from "@react95/core";
import AlertProvider from "./AlertProvider";
import Menu from "./Menu";
import TaskBarList from "./TaskBarList";
import "@react95/icons/icons.css";
import TopFiles from "./TopFiles";
import BottomFiles from "./BottomFiles";

const Desktop = () => {
  return (
    <AlertProvider>
      <ClippyProvider>
        <TopFiles />
        <Menu />
        <TaskBar list={<TaskBarList />} />
        <BottomFiles />
      </ClippyProvider>
    </AlertProvider>
  );
};

export default Desktop;
