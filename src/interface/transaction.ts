import { Transaction } from "../utils/types";

interface ICopyNotificationProps {
  fieldName: string;
  value: string;
}
interface ITransactionRow {
  from: string;
  to: string;
  amount: number;
}
interface ITransactionTable {
  transactions: Transaction[];
}
interface CopyableCellProps {
  value: string | number;
  fieldName: string;
  copyState: CopyState;
  onCopy: (text: string, fieldName: string) => void;
  shouldTruncate?: boolean;
  maxLength?: number;
}

type CopyState = {
  field: string | null;
  isAnimating: boolean;
};
export type {
  CopyableCellProps,
  CopyState,
  ICopyNotificationProps,
  ITransactionRow,
  ITransactionTable,
};
