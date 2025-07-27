import { Modal } from "@react95/core";
import React, { Suspense } from "react";
import { Appwiz1502 } from "@react95/icons";

const Menu = () => {
  return (
    <Suspense>
      {/* @ts-expect-error think its chill */}
      <Modal
        icon={<Appwiz1502 variant="32x32_4" />}
        className="w-fit m-auto left-1/3"
        // tailwind top-x doesnt work here for whatever reason
        style={{ top: "40%" }}
        type="info"
        title="Brainrot GPT Wizard"
      >
        <Modal.Content>
          <div className="px-2 w-full flex flex-col gap-4">
            <div className="mx-auto text-md">
              Im no longer running this but feel free to check out the{" "}
              <a
                href="https://github.com/tfrank11/brainrot-gpt-server"
                target="_blank"
              >
                source
              </a>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </Suspense>
  );
};

export default Menu;
