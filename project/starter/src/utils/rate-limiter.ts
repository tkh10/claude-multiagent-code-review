export class RateLimiter {
  private requests: number[] = [];
  private maxRequestsPerMinute: number;

  constructor(maxRequestsPerMinute = 50) {
    this.maxRequestsPerMinute = maxRequestsPerMinute;
  }

  canProceed(): boolean {
    this.pruneOldRecords();
    return this.requests.length < this.maxRequestsPerMinute;
  }

  async acquire(): Promise<void> {
    while (!this.canProceed()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    this.requests.push(Date.now());
  }

  pruneOldRecords(): void {
    const oneMinuteAgo = Date.now() - 60000;
    this.requests = this.requests.filter((timestamp) => timestamp > oneMinuteAgo);
  }
}
