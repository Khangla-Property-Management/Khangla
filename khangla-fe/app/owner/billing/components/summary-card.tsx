"use client";
import { styles } from "../styles/billing-styles";

interface Props {
  label: string;
  value: string;
  accent?: "green" | "red";
}

export function SummaryCard({ label, value, accent }: Props) {
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