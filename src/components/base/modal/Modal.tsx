import { ReactNode } from "react";
import { createPortal } from "react-dom";
import useEventListener from "@/hooks/useEventListener";
import Card from "../Card";

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  const wrapperDocument = document.getElementById(
    "popup-container"
  ) as HTMLElement;
  return createPortal(children, wrapperDocument);
};

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
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
      <Card className="centered fixed z-[9999] w-[80%] rounded-md bg-white p-5 duration-300 ease-in-out xxs:w-auto">
        <button
          onClick={onClose}
          className="close-btn absolute right-2 top-1 hover:scale-110 hover:font-bold active:scale-110">
          X
        </button>
        <div className="modal-content">{children}</div>
      </Card>
      <div
        onClick={onClose}
        role="button"
        aria-label="close modal"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape" || e.key === "Enter") onClose();
        }}
        className="fixed inset-0 z-[9000] bg-overlayBlack"
      />
    </ModalPortal>
  );
}

export default Modal;
