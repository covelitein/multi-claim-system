"use client";

import { Modal } from "@heroui/react";
import type { ReactNode } from "react";

export function CenteredModalFrame({ children }: { children: ReactNode }) {
  return (
    <Modal.Backdrop>
      <Modal.Container className="justify-center" placement="center" size="sm">
        <Modal.Dialog className="mx-auto w-full">{children}</Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
