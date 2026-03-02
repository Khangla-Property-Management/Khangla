"use client";
import { styles } from "../styles/billing-styles";

export function BillingHeader() {
  return (
    <div style={styles.header}>
      <div style={styles.headerTitle}>Owner Billing</div>
      <div style={styles.headerSub}>
        History, transactions and current balance
      </div>
    </div>
  );
}