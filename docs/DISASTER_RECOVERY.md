# DISASTER RECOVERY GUIDE

## Recovery Objectives

```text
RTO: 4 hours
RPO: 24 hours
```

## Protected Assets

```text
index.html
dossiers/
assets/
css/
js/
docs/
backups/
GitHub repository
Cloudflare Pages project
DNS/domain settings
```

## Backup Schedule

```text
After every major update: commit and push to GitHub
Weekly: export full project ZIP
Monthly: archive stable release
Before major changes: create rollback ZIP
```

## Restore From GitHub

1. Open repository.
2. Confirm latest stable commit.
3. Revert broken commit if needed.
4. Push corrected main branch.
5. Wait for Cloudflare redeployment.
6. Verify public site.

## Restore From ZIP

1. Extract latest stable ZIP.
2. Copy files into local repository.
3. Test `index.html`.
4. Commit in GitHub Desktop.
5. Push origin.
6. Verify Cloudflare deployment.
