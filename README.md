[English](./README.md) | [日本語](./README.ja.md)

# Next.js Monorepo + Azure Static Web Apps Deployment Reference

This repository is a working reference for deploying a `Next.js` monorepo to `Azure Static Web Apps` using `GitHub Actions`.

It keeps the setup minimal so the same structure can be reproduced easily in a public repository.

## What This Sample Demonstrates

- Monorepo management with `Turborepo + pnpm`
- Two Next.js apps (`app1` / `app2`) in one repository
- Shared packages (`@repo/common` / `@repo/ui`)
- Separate GitHub Actions workflows for per-app Azure SWA deployment

## Repository Structure

```txt
.
├─ apps/
│  ├─ app1/  # Next.js (port: 3000)
│  └─ app2/  # Next.js (port: 3001)
├─ packages/
│  ├─ common/
│  ├─ ui/
│  ├─ eslint-config/
│  └─ typescript-config/
└─ .github/workflows/
   ├─ azure-static-web-apps-green-field-05695fa00.yml   # for app1
   └─ azure-static-web-apps-orange-forest-03e2a8700.yml # for app2
```

## Local Development

Prerequisites:

- Node.js `>= 18`
- pnpm `9.x`

```sh
pnpm install
pnpm dev
```

Main commands:

```sh
pnpm build
pnpm lint
pnpm check-types
```

## Azure Static Web Apps Deployment Settings (Key Points)

The following configuration is confirmed to work in this repository:

- `app_location` points to each app directory (`apps/app1` / `apps/app2`)
- `output_location` is an empty string (`""`) for Next.js hybrid build
- `api_location` is an empty string (`""`)
- `NPM_CONFIG_INSTALL_LINKS: true` is set in the deploy step of each workflow
- Each app sets `transpilePackages: ["@repo/common", "@repo/ui"]` in `next.config.js`
- Shared packages are referenced via `file:../../packages/...`

## How To Reuse This Repository

1. Fork or clone this repository.
2. Create Azure Static Web Apps for both `app1` and `app2`.
3. Set deployment tokens in GitHub Secrets:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_FIELD_05695FA00`
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_ORANGE_FOREST_03E2A8700`
4. Update secret names and target branches in workflow files as needed.
5. Push to `main` and verify deployment.

## Notes

- `app1` and `app2` include a `/api/health` Route Handler.
- The workflows run preview deployment on PR creation and close processing on PR close.

## License

This repository is licensed under the [MIT License](./LICENSE).
