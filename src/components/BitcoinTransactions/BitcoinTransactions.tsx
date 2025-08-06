import { useBitcoinTransactions } from "../../hooks/useBitcoinTransactions";
import { Button } from "../Button/Button";

import styles from "./BitcoinTransactions.module.css";
import { TransactionTable } from "./TransactionsTable/TransactionsTable";

export function BitcoinTransactions() {
  const {
    transactions,
    totalAmount,
    startSubscription,
    stopSubscription,
    resetData,
  } = useBitcoinTransactions();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bitcoin Transactions</h1>
      <div className={styles.controlContainer}>
        <Button className={styles.controlButton} onClick={startSubscription}>
          Start
        </Button>
        <Button className={styles.controlButton} onClick={stopSubscription}>
          Stop
        </Button>
        <Button className={styles.controlButton} onClick={resetData}>
          Reset
        </Button>
      </div>
      <h2 className={styles.totalAmount}>Total sum: {totalAmount} BTC</h2>
      <TransactionTable transactions={transactions} />
    </div>
  );
}
