import { ReactNode } from "react";
import { createPortal } from "react-dom";
import useEventListener from "../../../hooks/useEventListener";
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

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const onKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      console.log("escape button clicked");
    }
  };
  useEventListener("keydown", onKeydownHandler);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <Card className="centered fixed z-50 grid w-[80%] max-w-lg rounded-md bg-white p-5 duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="close-btn absolute right-2 top-1 hover:scale-110 hover:font-bold active:scale-110">
          X
        </button>
        <div className="modal-content">{children}</div>
      </Card>
      <div
        onClick={onClose}
        className="fixed inset-0 z-10 bg-overlayBlack"></div>
    </ModalPortal>
  );
};

export default Modal;
