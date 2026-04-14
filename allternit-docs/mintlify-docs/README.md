# Allternit Docs - Mintlify

Documentation site for Allternit, built with Mintlify.

## Structure

- `mint.json` - Site configuration with Allternit branding
- `pages/` - All documentation content
- `logo/` - Light/dark logos
- `favicon.svg` - A:// logo

## Branding

- Primary color: `#d97757` (Allternit orange)
- Background: `#0a0a0f` (Dark)
- Default mode: Dark
- Logo: A:// text logo

## Deployment

1. Push this folder to a GitHub repo
2. Go to [mintlify.com](https://mintlify.com)
3. Connect your GitHub repo
4. Add custom domain: `docs.allternit.com`
5. Done! Auto-deploys on every push

## Local Preview (requires Node LTS)

```bash
nvm use 20  # or 18, 22
npm install -g mintlify
cd mintlify-docs
mintlify dev
```

Open http://localhost:3000
