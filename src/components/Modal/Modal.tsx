import { createPortal } from "react-dom"; import styled from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])
  return (
    createPortal(
      <div className={styled.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
        <div className={styled.modal}>
          <button onClick={onClose} className={styled.closeButton} aria-label="Close modal">
            &times;
          </button>
          {children}
        </div>
      </div>, document.body
    )

  );
}
