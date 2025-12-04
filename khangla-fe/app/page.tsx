export default function Home() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 600,
          color: "#1F2937",
          textAlign: "center",
        }}
      >
        Khangla: Find your perfect stay, anytime, anywhere
      </h1>
    </main>
  );
}
