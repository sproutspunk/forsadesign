## Contributing
Thanks for your interest in contributing to Forsa Design.

## Before you start

- Make sure you have Node.js 24+ and pnpm 10+ installed.
- Read the main `README.md` to understand the project structure and development workflow.
- Open an issue first if you want to discuss a major change.

## Development setup

```bash
pnpm install
```

## Quality checks

Run the quality checks before submitting changes:

```bash
pnpm run lint
pnpm run typecheck
pnpm run format:check
pnpm run check
```

## Branches and pull requests

- Create a branch for your change.
- Keep pull requests focused and small when possible.
- Include a clear description of what changed and why.
- Link related issues when applicable.

## Code style

- Follow the existing code style in the repository.
- Keep TypeScript types accurate and avoid unnecessary `any`.
- Prefer small, readable changes over large refactors unless required.

## Testing

- Run the appropriate checks for the part of the repository you changed.
- If your change affects build output, verify the build locally before opening a PR.

## Reporting problems

If you find a bug or unexpected behavior, open an issue with:

- a short summary,
- steps to reproduce,
- expected behavior,
- actual behavior,
- any relevant logs or screenshots.
