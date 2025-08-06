import React from "react";
import { CopyableCellProps } from "../../../../interface/transaction";
import { truncateText } from "../../../../utils/textUtils";
import { CopyNotification } from "../CopyNotification/CopyNotification";
import styles from "../TransactionRow/TransactionRow.module.css";

export const CopyableCell: React.FC<CopyableCellProps> = ({
  value,
  fieldName,
  copyState,
  onCopy,
  shouldTruncate = true,
  maxLength = 50,
}) => {
  const stringValue = value.toString();

  const displayValue = shouldTruncate
    ? truncateText(stringValue, maxLength)
    : stringValue;

  const isActive = copyState.field === fieldName;
  const shouldShowTooltip = shouldTruncate && stringValue.length > maxLength;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCopy(stringValue, fieldName);
    }
  };

  return (
    <div
      className={`${styles.dataText} ${isActive ? styles.copied : ""} ${
        copyState.isAnimating ? styles.animating : ""
      }`}
      onClick={() => onCopy(stringValue, fieldName)}
      title={shouldShowTooltip ? stringValue : undefined}
      role="button"
      tabIndex={0}
      aria-label={`Copy ${fieldName}: ${stringValue}`}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.cellContent}>{displayValue}</span>
      {isActive && (
        <CopyNotification fieldName={fieldName} value={stringValue} />
      )}
    </div>
  );
};
