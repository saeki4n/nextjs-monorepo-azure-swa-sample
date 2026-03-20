# Next.js Monorepo + Azure Static Web Apps デプロイ成功サンプル

このリポジトリは、`Next.js` モノレポを `GitHub Actions` ワークフローで `Azure Static Web Apps` にデプロイするための成功サンプルです。

公開リポジトリとして、同じ構成を再現しやすいように最小限の構成と設定ポイントをまとめています。

## このサンプルで確認できること

- `Turborepo + pnpm` のモノレポ運用
- 2つの Next.js アプリ（`app1` / `app2`）を同一リポジトリで管理
- 共有パッケージ（`@repo/common` / `@repo/ui`）の利用
- アプリごとに分離した GitHub Actions ワークフローでの Azure SWA デプロイ

## リポジトリ構成

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
   ├─ azure-static-web-apps-green-field-05695fa00.yml   # app1 用
   └─ azure-static-web-apps-orange-forest-03e2a8700.yml # app2 用
```

## ローカル実行

前提:

- Node.js `>= 18`
- pnpm `9.x`

```sh
pnpm install
pnpm dev
```

主なコマンド:

```sh
pnpm build
pnpm lint
pnpm check-types
```

## Azure Static Web Apps デプロイ設定（重要ポイント）

このリポジトリでデプロイ成功を確認した設定は次のとおりです。

- `app_location` は各アプリディレクトリを指定（`apps/app1` / `apps/app2`）
- `output_location` は空文字（`""`）を指定（Next.js hybrid build）
- `api_location` は空文字（`""`）を指定
- workflow の deploy step で `NPM_CONFIG_INSTALL_LINKS: true` を設定
- 各アプリの `next.config.js` に `transpilePackages: ["@repo/common", "@repo/ui"]` を設定
- 共有パッケージは `file:../../packages/...` で参照

## 公開リポジトリとして利用する手順

1. このリポジトリを Fork / Clone する
2. Azure Static Web Apps を `app1` 用と `app2` 用に作成する
3. GitHub Secrets にデプロイトークンを設定する
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_FIELD_05695FA00`
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_ORANGE_FOREST_03E2A8700`
4. 必要に応じて workflow ファイル内の Secret 名や対象ブランチを変更する
5. `main` ブランチへ push してデプロイを確認する

## 補足

- `app1` / `app2` には `/api/health` の Route Handler を用意しています。
- PR 作成時は preview デプロイ、PR close 時はクローズ処理が走る構成です。

## ライセンス

このリポジトリは [MIT License](./LICENSE) です。
