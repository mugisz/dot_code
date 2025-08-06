import React from "react";
import { useCopyToClipboard } from "../../../../hooks/useCopyToClipboard";
import { CopyableCell } from "../CopyableCell/CopyableCell";
import { ITransactionRow } from "../../../../interface/transaction";

export const TransactionRow: React.FC<ITransactionRow> = ({
  from,
  to,
  amount,
}) => {
  const { copyState, copyToClipboard } = useCopyToClipboard();

  return (
    <>
      <CopyableCell
        value={from}
        fieldName="from"
        copyState={copyState}
        onCopy={copyToClipboard}
        shouldTruncate={true}
      />
      <CopyableCell
        value={to}
        fieldName="to"
        copyState={copyState}
        onCopy={copyToClipboard}
        shouldTruncate={true}
      />
      <CopyableCell
        value={amount}
        fieldName="amount"
        copyState={copyState}
        onCopy={copyToClipboard}
        shouldTruncate={false}
      />
    </>
  );
};
