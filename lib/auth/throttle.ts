type Attempt = {
  failures: number;
  lastFailureAt: number;
  blockedUntil: number;
};

const attempts = new Map<string, Attempt>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const MAX_DELAY_MS = 8_000;
const MAX_ENTRIES = 2_000;

const prune = (now: number): void => {
  for (const [key, attempt] of attempts) {
    if (now - attempt.lastFailureAt > WINDOW_MS && now >= attempt.blockedUntil) {
      attempts.delete(key);
    }
  }

  while (attempts.size > MAX_ENTRIES) {
    const oldestKey = attempts.keys().next().value;

    if (!oldestKey) {
      break;
    }

    attempts.delete(oldestKey);
  }
};

export const getLoginDelay = (ip: string, now = Date.now()): number => {
  prune(now);

  const attempt = attempts.get(ip);

  if (!attempt) {
    return 0;
  }

  return Math.max(0, attempt.blockedUntil - now);
};

export const recordLoginFailure = (ip: string, now = Date.now()): void => {
  prune(now);

  const previous = attempts.get(ip);
  const expired = !previous || now - previous.lastFailureAt > WINDOW_MS;

  const failures = expired ? 1 : previous.failures + 1;

  const delay = failures < MAX_FAILURES ? 0 : Math.min(MAX_DELAY_MS, 500 * 2 ** (failures - MAX_FAILURES));

  if (previous) {
    attempts.delete(ip);
  }

  attempts.set(ip, {
    failures,
    lastFailureAt: now,
    blockedUntil: now + delay,
  });
};

export const clearLoginFailures = (ip: string): boolean => attempts.delete(ip);

export const resetLoginThrottle = (): void => {
  attempts.clear();
};
