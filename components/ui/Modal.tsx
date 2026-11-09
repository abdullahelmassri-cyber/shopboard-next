"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode, RefObject, SyntheticEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  /** Whether the dialog is open. The parent owns and updates this state. */
  open: boolean;
  /** Called when the close button or Escape requests closure. */
  onClose: () => void;
  /** Visible heading that also provides the dialog's accessible name. */
  title: string;
  /** Optional supporting text associated with the dialog for assistive technology. */
  description?: string;
  /** Maximum dialog width. Defaults to medium. */
  size?: ModalSize;
  /** Dialog content. */
  children: ReactNode;
  /** Additional classes merged with the dialog's base classes. */
  className?: string;
  /** Focus target used when the opener is unavailable or can no longer receive focus. */
  fallbackFocusRef?: RefObject<HTMLElement | null>;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  children,
  className,
  fallbackFocusRef,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const restoreFocus = () => {
      const opener = openerRef.current;
      if (opener?.isConnected && !opener.matches(":disabled")) {
        opener.focus();
      }
      if (document.activeElement !== opener) {
        fallbackFocusRef?.current?.focus();
      }
      openerRef.current = null;
    };

    if (open) {
      if (!dialog.open) {
        openerRef.current =
          document.activeElement instanceof HTMLElement ? document.activeElement : null;
        dialog.showModal();
        const initialFocus = dialog.querySelector<HTMLElement>("[autofocus]");
        const closeControl = dialog.querySelector<HTMLButtonElement>("[data-modal-close]");
        (initialFocus ?? closeControl)?.focus();
      }

      return () => {
        if (dialog.open) {
          dialog.close();
        }
        restoreFocus();
      };
    }

    if (dialog.open) {
      dialog.close();
    }
    restoreFocus();
  }, [fallbackFocusRef, open]);

  function handleDialogCancel(event: SyntheticEvent<HTMLDialogElement>) {
    // Keep Escape dismissal controlled: React closes the dialog after the
    // parent updates `open`, and programmatic close events cannot be mistaken
    // for a later user dismissal.
    event.preventDefault();
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "m-auto w-11/12 border-0 bg-transparent p-0 text-foreground backdrop:bg-foreground/50 backdrop:backdrop-blur-sm",
        sizeClasses[size],
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={handleDialogCancel}
    >
      <Card className="p-6 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-foreground" id={titleId}>
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm text-muted" id={descriptionId}>
                {description}
              </p>
            )}
          </div>
          <Button
            data-modal-close
            aria-label="Close dialog"
            className="shrink-0"
            size="sm"
            variant="ghost"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </Button>
        </div>
        {children}
      </Card>
    </dialog>
  );
}
