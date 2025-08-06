import { useCallback, useEffect, useRef, useState } from "react";
import { Transaction } from "../utils/types";
import { uid } from "../utils/utils";
import { closeWebSocket, createWebSocket } from "../utils/webSocketUtils";

const WS_URL = "wss://ws.blockchain.info/inv";

export function useBitcoinTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    return stopSubscription;
  }, []);

  const startSubscription = useCallback(() => {
    ws.current = createWebSocket(
      WS_URL,
      "unconfirmed_sub",
      handleMessage,
      handleError
    );
  }, []);

  const stopSubscription = useCallback(() => {
    if (ws.current) {
      closeWebSocket(ws.current);
      ws.current = null;
    }
  }, []);

  const resetData = useCallback(() => {
    setTransactions([]);
    setTotalAmount(0);
  }, []);

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    const fromAddress = data.x.inputs[0]?.prev_out.addr || "Unknown";
    const toAddresses = data.x.out as Array<{ addr: string; value: number }>;

    const newTransactions = toAddresses
      .map((output) => ({
        id: uid(),
        from: fromAddress,
        to: output.addr,
        amount: output.value / 100000000,
      }))
      .filter(({ amount }) => amount > 0);

    if (newTransactions.length > 0) {
      setTransactions((prev) => [...prev, ...newTransactions]);
      setTotalAmount(
        (prev) =>
          prev + newTransactions.reduce((sum, { amount }) => sum + amount, 0)
      );
    }
  }, []);

  const handleError = useCallback((error: Event) => {
    console.error("WebSocket error:", error);
  }, []);

  return {
    transactions,
    totalAmount,
    startSubscription,
    stopSubscription,
    resetData,
  };
}
