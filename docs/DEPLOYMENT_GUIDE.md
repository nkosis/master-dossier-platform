# DEPLOYMENT GUIDE

## 1. Copy Files Into Local Repository

Copy this package into your local `master-dossier-platform` folder.

## 2. Test Locally

Open `index.html` in your browser. Confirm CSS, JS, sidebar collapse, cards, and mobile layout work.

## 3. Commit in GitHub Desktop

Commit message:

```text
Initial platform deployment package
```

Click `Commit to main`, then `Push origin`.

## 4. Connect Cloudflare Pages

Cloudflare Dashboard -> Workers & Pages -> Create application -> Pages -> Connect to Git.

Select repository: `master-dossier-platform`

Build settings:

```text
Framework preset: None
Build command: leave blank
Build output directory: /
```

Deploy and verify the public URL.
