export async function exponentialBackoff<T>(
  retries: number,
  fn: () => Promise<T>,
  onRetry?: (attempt: number) => void
): Promise<T> {
  let attempt = 0;
  let lastErr: any;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      onRetry?.(attempt + 1);
      const delay = 500 * Math.pow(2, attempt);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, delay));
      attempt++;
    }
  }
  throw lastErr;
}
