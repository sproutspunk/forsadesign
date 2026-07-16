---
name: Stale .git/index.lock blocks commits from Replit
description: A leftover git lock file from a crashed or interrupted git process silently blocks every subsequent commit/add/merge in the Replit workspace.
---

**Symptom:** `git commit` (via shell or the Replit Git pane) fails with an error
like `fatal: Unable to create '/home/runner/.../.git/index.lock': File exists.`
No files can be staged or committed, even though the working tree is clean and
no git process appears to be actually running.

**Why:** Git creates `.git/index.lock` (and similarly `HEAD.lock`,
`refs/heads/<branch>.lock`, `config.lock`) while it holds the index/ref for
writing during `add`, `commit`, `merge`, or `rebase`. If that git process is
killed abruptly — a Replit workspace restart, an out-of-memory kill, a forced
stop of an in-progress git command, or two git operations racing against the
same repo at once (e.g. an agent and the Replit Git pane committing
simultaneously) — the lock file is never cleaned up. Every later git write
operation sees the stale lock and refuses to proceed, assuming another process
still holds it, even though nothing is actually running anymore.

**How to apply:** First confirm no git process is genuinely in progress
(`ps aux | grep git` returns nothing relevant). Then remove the stale lock
file(s): `rm -f .git/index.lock`, and check for `.git/HEAD.lock`,
`.git/refs/heads/*.lock`, `.git/config.lock` as well. Retry the commit — it
should succeed immediately once the lock is cleared. To avoid recurrence,
don't run git commands from more than one tool/agent/pane against the same
workspace concurrently, and avoid force-killing a git command mid-write.
