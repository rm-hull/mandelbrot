import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  error: unknown;
}

export default function ErrorFallback({ error }: ErrorFallbackProps) {
  const err = error instanceof Error ? error : new Error(String(error));
  return (
    <div role="alert" className={styles.error}>
      <h1 className={styles.message}>{err.message}</h1>
      <h3>Stack trace:</h3>
      <pre>{err.stack}</pre>
    </div>
  );
}
