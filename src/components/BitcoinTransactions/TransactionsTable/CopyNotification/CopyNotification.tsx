import React from "react";
import { ICopyNotificationProps } from "../../../../interface/transaction";
import { getCopyMessage } from "../../../../utils/textUtils";
import styles from "../TransactionRow/TransactionRow.module.css";

export const CopyNotification: React.FC<ICopyNotificationProps> = ({
  fieldName,
  value,
}) => {
  return (
    <div className={styles.copyNotification}>
      <span className={styles.copyIcon}>✓</span>
      <span className={styles.copyText}>
        Copied: {getCopyMessage(fieldName, value)}
      </span>
    </div>
  );
};
