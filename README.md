# Turborepo スターター

この Turborepo スターターは Turborepo コアチームによって管理されています。

## このテンプレートの使い方

次のコマンドを実行します。

```sh
npx create-turbo@latest
```

## 構成内容

この Turborepo には以下の apps/packages が含まれています。

### Apps と Packages

- `app1`: [Next.js](https://nextjs.org/) アプリ
- `app2`: もうひとつの [Next.js](https://nextjs.org/) アプリ
- `@repo/common`: `app1` と `app2` で共有するユーティリティライブラリ
- `@repo/ui`: `app1` と `app2` で共有する React コンポーネントライブラリ
- `@repo/eslint-config`: `eslint` 設定（`eslint-config-next` と `eslint-config-prettier` を含む）
- `@repo/typescript-config`: モノレポ全体で使う `tsconfig.json`

すべての package/app は [TypeScript](https://www.typescriptlang.org/) で構成されています。

### ユーティリティ

この Turborepo では以下のツールを利用できます。

- [TypeScript](https://www.typescriptlang.org/)（静的型チェック）
- [ESLint](https://eslint.org/)（コード lint）
- [Prettier](https://prettier.io)（コード整形）

### ビルド

すべての app/package をビルドするには以下を実行します。

[global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) をインストールしている場合（推奨）:

```sh
cd my-turborepo
turbo build
```

global `turbo` を使わない場合:

```sh
cd my-turborepo
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

特定パッケージのみビルドする場合は [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters) を使います。

[global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) をインストールしている場合:

```sh
turbo build --filter=app1
# app2 をビルドする場合
turbo build --filter=app2
```

global `turbo` を使わない場合:

```sh
npx turbo build --filter=app1
yarn exec turbo build --filter=app1
pnpm exec turbo build --filter=app1
# app2 をビルドする場合
pnpm exec turbo build --filter=app2
```

### 開発

すべての app/package を開発モードで起動するには以下を実行します。

[global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) をインストールしている場合（推奨）:

```sh
cd my-turborepo
turbo dev
```

global `turbo` を使わない場合:

```sh
cd my-turborepo
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

特定パッケージのみ起動する場合は [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters) を使います。

[global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) をインストールしている場合:

```sh
turbo dev --filter=app1
# app2 を起動する場合
turbo dev --filter=app2
```

global `turbo` を使わない場合:

```sh
npx turbo dev --filter=app1
yarn exec turbo dev --filter=app1
pnpm exec turbo dev --filter=app1
# app2 を起動する場合
pnpm exec turbo dev --filter=app2
```

### VSCode デバッグ

`.vscode/launch.json` には以下の構成が入っています。

- `app1: Full Stack Debug`
- `app2: Full Stack Debug`

VSCode の「実行とデバッグ」から選択すると、それぞれの Next.js アプリを個別にデバッグできます。

### API ルート

それぞれのアプリに Next.js Route Handler を用意しています。

- `app1`: `/api/health`
- `app2`: `/api/health`

どちらの API も `app` / `message` / `timestamp` を含む JSON を返します。

### Azure SWA デプロイメモ（成功した構成）

Azure Static Web Apps で Next.js API Routes を含む構成をデプロイする際、以下の設定で成功を確認しました。

- `next.config.js` で `output: "export"` を使わず、Next.js hybrid 構成にする
- `app_location` は各アプリのディレクトリ（`apps/app1` / `apps/app2`）を指定する
- `output_location` は空文字（`""`）のままにする
- `api_location` は空文字（`""`）のままにして、SWA の Next.js function handler に任せる
- GitHub Actions の deploy step で `NPM_CONFIG_INSTALL_LINKS: true` を設定する
- 各アプリの `next.config.js` に `transpilePackages: ["@repo/common", "@repo/ui"]` を設定する
- 共有パッケージは `file:../../packages/...` のローカル依存として扱う

### リモートキャッシュ

> [!TIP]
> Vercel Remote Cache は全プランで無料です。詳細は [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache) を参照してください。

Turborepo は [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) によって、マシン間でビルドキャッシュを共有できます。チーム開発や CI/CD の高速化に有効です。

デフォルトではローカルキャッシュが使われます。Remote Caching を有効化するには Vercel アカウントが必要です。未登録の場合は [こちら](https://vercel.com/signup?utm_source=turborepo-examples) から作成できます。

[global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) をインストールしている場合（推奨）:

```sh
cd my-turborepo
turbo login
```

global `turbo` を使わない場合:

```sh
cd my-turborepo
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

この操作で Turborepo CLI と [Vercel アカウント](https://vercel.com/docs/concepts/personal-accounts/overview) の認証が行われます。

続けて、リポジトリを Remote Cache に紐付けます。

[global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) をインストールしている場合:

```sh
turbo link
```

global `turbo` を使わない場合:

```sh
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## 参考リンク

Turborepo の詳細:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
