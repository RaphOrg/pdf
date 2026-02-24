# Contributing

## Ground rules
- Default branch: `main`
- Work in a branch: `yourname/short-topic`
- Keep PRs small, single-purpose
- PRs must pass CI (lint + test + CLI smoke)

## Local setup
```bash
git clone https://github.com/RaphOrg/pdf
cd pdf
npm ci
npm test
npm run lint
npm run cli -- --help
```

## Branch + PR workflow (gh CLI)
```bash
# create a branch
git checkout -b yourname/thing

# commit normally
git add -A
git commit -m "feat: thing"

# push + open PR
git push -u origin HEAD

gh pr create -t "feat: thing" -b "what/why + testing notes"
```

## Commit style
Not strict, but prefer:
- `feat:` new functionality
- `fix:` bug fix
- `chore:` tooling/maintenance
- `docs:` documentation

## What to include in PR descriptions
- What changed (1-3 bullets)
- How to test locally
- Any limitations / follow-ups
