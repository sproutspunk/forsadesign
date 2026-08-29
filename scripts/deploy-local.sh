#!/usr/bin/env bash
set -euo pipefail

# Local deploy script for Forsa Design.
# Use this when GitHub Actions is unavailable (e.g. billing lock).
# It builds the marketing site and deploys it to Cloudflare Pages.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_NAME="forsadesign"
DIST_DIR="artifacts/forsa-design/dist/public"
GA_ID="G-9QKVVE4QXE"

cd "$ROOT"

echo "==> Installing dependencies..."
pnpm install --no-frozen-lockfile

echo "==> Building with GA4 ID $GA_ID..."
VITE_GA_MEASUREMENT_ID="$GA_ID" pnpm --filter @workspace/forsa-design run build

echo "==> Deploying to Cloudflare Pages project '$PROJECT_NAME'..."
pnpm exec wrangler pages deploy "$DIST_DIR" --project-name="$PROJECT_NAME" --commit-dirty=true

echo "==> Done."
