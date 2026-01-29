"use client";
import React from "react";

type Transaction = {
  id: string;
  date: string; // ISO or readable
  description: string;
  amount: number; // positive value
  type: "debit" | "credit"; // debit = charge, credit = payment
  status: "Paid" | "Pending";
};

const transactions: Transaction[] = [
  // Charges (debit) and Payments (credit)
  {
    id: "t-001",
    date: "2025-01-01",
    description: "Rent (CR13) January",
    amount: 10000,
    type: "debit",
    status: "Paid",
  },
  {
    id: "t-002",
    date: "2025-01-02",
    description: "Water (CR13) January",
    amount: 3000,
    type: "debit",
    status: "Paid",
  },
  {
    id: "t-003",
    date: "2025-01-03",
    description: "Payment received (CR13)",
    amount: 13000,
    type: "credit",
    status: "Paid",
  },
  {
    id: "t-004",
    date: "2025-01-10",
    description: "Rent (CR14) January",
    amount: 9500,
    type: "debit",
    status: "Paid",
  },
  {
    id: "t-005",
    date: "2025-01-10",
    description: "Water (CR14) January",
    amount: 2800,
    type: "debit",
    status: "Pending",
  },
  {
    id: "t-006",
    date: "2025-01-11",
    description: "Payment received (CR14)",
    amount: 9500,
    type: "credit",
    status: "Paid",
  },
  {
    id: "t-007",
    date: "2025-01-15",
    description: "Rent (CR15) January",
    amount: 8000,
    type: "debit",
    status: "Pending",
  },
  {
    id: "t-008",
    date: "2025-01-20",
    description: "Water (CR15) January",
    amount: 2500,
    type: "debit",
    status: "Paid",
  },
  {
    id: "t-009",
    date: "2025-01-21",
    description: "Payment received (CR15)",
    amount: 2500,
    type: "credit",
    status: "Paid",
  },
  {
    id: "t-010",
    date: "2025-01-25",
    description: "Rent (CR22) January",
    amount: 9800,
    type: "debit",
    status: "Paid",
  },
  {
    id: "t-011",
    date: "2025-01-26",
    description: "Water (CR22) January",
    amount: 2700,
    type: "debit",
    status: "Paid",
  },
  {
    id: "t-012",
    date: "2025-01-27",
    description: "Payment received (CR22)",
    amount: 12500,
    type: "credit",
    status: "Paid",
  },
];

export default function BillingPage() {
  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "debit") acc.debits += t.amount;
      else acc.credits += t.amount;
      return acc;
    },
    { debits: 0, credits: 0 }
  );
  const balance = totals.credits - totals.debits; // positive = net received, negative = outstanding

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>Owner Billing</div>
        <div style={styles.headerSub}>
          History, transactions and current balance
        </div>
      </div>

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

      <div style={styles.listCard}>
        <div style={styles.listHeader}>
          <span style={styles.listTitle}>Transaction History</span>
          <span style={styles.listCount}>{transactions.length} items</span>
        </div>
        <div style={styles.listBody}>
          {transactions
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((t) => (
              <div key={t.id} style={styles.row}>
                <div style={styles.colPrimary}>
                  <div style={styles.rowTitle}>{t.description}</div>
                  <div style={styles.rowSub}>
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                </div>
                <div style={styles.colAmount}>
                  <span
                    style={{
                      ...styles.amountPill,
                      background: t.type === "credit" ? "#DCFCE7" : "#FEE2E2",
                      color: t.type === "credit" ? "#166534" : "#991B1B",
                      borderColor: t.type === "credit" ? "#86EFAC" : "#FCA5A5",
                    }}
                  >
                    {t.type === "credit" ? "+" : "-"} Nu.{" "}
                    {t.amount.toLocaleString()}
                  </span>
                </div>
                <div style={styles.colStatus}>
                  <span
                    style={{
                      ...styles.statusPill,
                      background: t.status === "Paid" ? "#22c55e" : "#ef4444",
                      borderColor: t.status === "Paid" ? "#22c55e" : "#ef4444",
                    }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "green" | "red";
}) {
  return (
    <div style={styles.summaryCard}>
      <div style={styles.summaryLabel}>{label}</div>
      <div
        style={{
          ...styles.summaryValue,
          color:
            accent === "green"
              ? "#166534"
              : accent === "red"
              ? "#991B1B"
              : "#1f2937",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: 16,
    maxWidth: 960,
    margin: "0 auto",
    background: "#F6F3EE",
    color: "#547794",
  },
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 800,
  },
  headerSub: {
    fontSize: 13,
    color: "#6B7C88",
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  summaryCard: {
    background: "#FFFFFF",
    border: "1px solid #C2C9CD",
    borderRadius: 12,
    padding: "10px 12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6B7C88",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 800,
  },
  listCard: {
    background: "#FFFFFF",
    border: "1px solid #C2C9CD",
    borderRadius: 12,
    padding: "10px 12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  listTitle: {
    fontWeight: 800,
    fontSize: 14,
  },
  listCount: {
    fontSize: 12,
    color: "#6B7C88",
  },
  listBody: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1.6fr 0.8fr 0.6fr",
    gap: 8,
    alignItems: "center",
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    padding: "8px 10px",
    background: "#FAFAFA",
  },
  colPrimary: {},
  rowTitle: { fontWeight: 700, fontSize: 13, color: "#1f2937" },
  rowSub: { fontSize: 12, color: "#6B7C88" },
  colAmount: { display: "flex", justifyContent: "flex-start" },
  amountPill: {
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid",
    fontSize: 12,
    fontWeight: 700,
  },
  colStatus: { display: "flex", justifyContent: "flex-end" },
  statusPill: {
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 700,
  },
};
