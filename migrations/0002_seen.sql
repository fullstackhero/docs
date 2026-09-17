-- Per-visitor dedup for the /api/views beacon. Replaces the DEDUPE KV
-- namespace: the KV free tier caps writes at 1,000/day, D1 at 100,000/day.
-- key is sha256(salt:ip:ua:slug); expires_at is a unix epoch (seconds).
-- Expired rows are swept opportunistically by the worker.
CREATE TABLE IF NOT EXISTS seen (
  key        TEXT PRIMARY KEY NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_seen_expires_at ON seen(expires_at);
