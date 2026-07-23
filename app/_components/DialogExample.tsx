"use client";

import type React from "react";

import { Dialog } from "@/components/primitives";
import { Button } from "@/components/ui";

import styles from "./styles.module.scss";

const DialogExample: React.FC = () => (
  <section className={styles.section}>
    <h2>Dialog</h2>
    <div className={styles.row}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button.Primary>Open dialog</Button.Primary>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Delete project</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete the project and remove all of its data.
          </Dialog.Description>
          <div className={styles.row}>
            <Dialog.Close asChild>
              <Button.Secondary>Cancel</Button.Secondary>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button.Primary>Delete</Button.Primary>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </section>
);

export { DialogExample };
