type Attempt = { failures: number; firstFailureAt: number; blockedUntil: number };

const attempts = new Map<string, Attempt>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_DELAY_MS = 8_000;
const MAX_ENTRIES = 2_000;

const prune = (now: number) => {
  for (const [key, attempt] of attempts) {
    if (now - attempt.firstFailureAt > WINDOW_MS) attempts.delete(key);
  }
  while (attempts.size > MAX_ENTRIES) attempts.delete(attempts.keys().next().value as string);
};

export const getLoginDelay = (ip: string, now = Date.now()) => {
  prune(now);
  const attempt = attempts.get(ip);
  if (!attempt || now - attempt.firstFailureAt > WINDOW_MS) return 0;
  return Math.max(0, attempt.blockedUntil - now);
};

export const recordLoginFailure = (ip: string, now = Date.now()) => {
  prune(now);
  const previous = attempts.get(ip);
  const failures = !previous || now - previous.firstFailureAt > WINDOW_MS ? 1 : previous.failures + 1;
  const delay = failures < MAX_FAILURES ? 0 : Math.min(MAX_DELAY_MS, 500 * 2 ** (failures - MAX_FAILURES));
  attempts.set(ip, { failures, firstFailureAt: previous?.firstFailureAt ?? now, blockedUntil: now + delay });
  return delay;
};

export const clearLoginFailures = (ip: string) => attempts.delete(ip);
export const resetLoginThrottle = () => attempts.clear();
