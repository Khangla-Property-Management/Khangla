"use client";

import { transactions } from "./data/transactions";
import { styles } from "./styles/billing-styles";
import { BillingHeader } from "./components/billing-header";
import { SummaryCard } from "./components/summary-card";
import { TransactionList } from "./components/transaction-list";

export default function BillingPage() {
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "debit") acc.debits += t.amount;
      else acc.credits += t.amount;
      return acc;
    },
    { debits: 0, credits: 0 }
  );

  const balance = totals.credits - totals.debits;

  const sortedTransactions = [...transactions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  return (
    <div style={styles.page}>
      <BillingHeader />

      <div style={styles.summaryGrid}>
        <SummaryCard
          label="Total Charges"
          value={`Nu. ${totals.debits.toLocaleString()}`}
        />
        <SummaryCard
          label="Total Payments"
          value={`Nu. ${totals.credits.toLocaleString()}`}
        />
        <SummaryCard
          label="Current Balance"
          value={`Nu. ${balance.toLocaleString()}`}
          accent={balance >= 0 ? "green" : "red"}
        />
      </div>

      <TransactionList transactions={sortedTransactions} />
    </div>
  );
}