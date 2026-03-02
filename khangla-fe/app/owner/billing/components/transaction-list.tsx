"use client";
import { styles } from "../styles/billing-styles";
import { TransactionRow } from "./transaction-row";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  status: string;
}

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div style={styles.listCard}>
      <div style={styles.listHeader}>
        <div style={styles.listTitle}>Transactions</div>
        <div style={styles.listCount}>{transactions.length} items</div>
      </div>

      <div style={styles.listBody as any}>
        {transactions.map((t) => (
          <TransactionRow key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  );
}
