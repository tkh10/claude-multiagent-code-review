import { describe, it, expect } from 'vitest';
import { RateLimiter } from '../../src/utils/rate-limiter.js';
import { withTimeout } from '../../src/utils/error-handler.js';

describe('Utility Modules', () => {
  it('RateLimiter should allow requests within limit', () => {
    const limiter = new RateLimiter(10);
    expect(limiter.canProceed()).toBe(true);
  });

  it('withTimeout should resolve if within time limit', async () => {
    const result = await withTimeout(Promise.resolve('success'), 1000);
    expect(result).toBe('success');
  });
});
