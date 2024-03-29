import { ReactNode } from "react";
import useEventListener from "@/hooks/useEventListener";
import Card from "../Card";
import { ModalPortal } from "./Modal";

interface ErrorModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function ErrorModal({ children, isOpen, onClose }: ErrorModalProps) {
  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  useEventListener("keydown", onKeydownHandler);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <Card className="centered fixed z-[9999] grid w-[80%] max-w-lg auto-rows-fr grid-rows-2 rounded-lg bg-white duration-1000 ease-in-out">
        <div className="relative grid place-content-center rounded-t-lg bg-red-400 py-6">
          <button
            onClick={onClose}
            className="close-btn absolute right-2 top-1 text-slate-200 hover:scale-110 hover:font-bold active:scale-110">
            &#10006;
          </button>
          <div className="h-16 w-16 rounded-[50%] border-4 border-white p-3 text-center  text-2xl text-white">
            &#10006;
          </div>
        </div>
        <div className="grid place-content-center">{children}</div>
      </Card>

      <div
        role="button"
        tabIndex={0}
        aria-label="close modal"
        onClick={onClose}
        className="fixed inset-0 z-[9000] bg-overlayBlack"
        onKeyDown={(e) => {
          if (e.key === "Enter") onClose();
        }}
      />
    </ModalPortal>
  );
}

export default ErrorModal;
