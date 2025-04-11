// src/components/ui/Modal.tsx
"use client";

import { ReactNode } from "react";
import styles from "../../app/dashboard/dashboard.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSubmit: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <button className={styles.closeModalBtn} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalContent}>
          <div className={styles.modalMessage}>
            <span className={styles.modalIcon}>
              <img src="/car.svg" alt="Ícone de Carro" width={64} height={64} />
            </span>
            <p>{title}</p>
          </div>
          <div className={styles.modalForm}>{children}</div>
          <button className={styles.submitBtn} onClick={onSubmit}>
            Criar Veículo
          </button>
        </div>
      </div>
    </>
  );
}
