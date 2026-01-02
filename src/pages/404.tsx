import { color } from "framer-motion";
import Link from "next/link";

export default function Custom404() {
  return (
    <div style={styles.container as React.CSSProperties}>
      <h1 style={styles.title}>404</h1>
      <h2 style={styles.subtitle}>Oops! Page not found</h2>
      <p style={styles.text}>
        The page you are looking for does not exist or was moved.
      </p>

      <Link href="/">
        <button style={styles.button}>Go Back Home</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "#f9fafb",
    padding: "20px",
  },
  title: {
    fontSize: "120px",
    fontWeight: "bold",
    // color: "#2563eb",
    color: "#002b45",
    margin: 0,
  },
  subtitle: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  text: {
    color: "#6b7280",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#002b45",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
