"use client";
import { styles } from "../styles/billing-styles";
export function TransactionRow({ transaction }: any) {
  return (
    <div
      style={styles.row}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(0,0,0,0.06)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "none")
      }
    >
      <div>
        <div style={styles.rowTitle}>{transaction.description}</div>
        <div style={styles.rowSub}>
          {new Date(transaction.date).toLocaleDateString()}
        </div>
      </div>

      <div>
        <span
          style={{
            ...styles.amountPill,
            background:
              transaction.type === "credit" ? "#DCFCE7" : "#FEE2E2",
            color:
              transaction.type === "credit" ? "#166534" : "#991B1B",
            borderColor:
              transaction.type === "credit" ? "#86EFAC" : "#FCA5A5",
          }}
        >
          {transaction.type === "credit" ? "+" : "-"} Nu.{" "}
          {transaction.amount.toLocaleString()}
        </span>
      </div>

      <div>
        <span
          style={{
            ...styles.statusPill,
            background:
              transaction.status === "Paid" ? "#22c55e" : "#f97316",
          }}
        >
          {transaction.status}
        </span>
      </div>
    </div>
  );
}
