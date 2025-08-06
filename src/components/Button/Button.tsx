import { ReactNode } from "react";

import styles from "./Button.module.css";

interface IButton {
  className?: string;
  onClick: () => void;
  children: ReactNode;
}

export function Button({ className, onClick, children }: IButton) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
