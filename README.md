# 記事管理CMS

Next.js（App Router）を使用して制作した、記事管理、タグ管理、カテゴリ管理が行えるアプリです。
編集、追加、削除機能に加え、カテゴリやワード検索機能も実装しています。

## 主な機能

### 記事管理

- 記事一覧の表示
- 記事の新規作成・編集・削除
- タイトル、スラッグ、概要、本文、著者、サムネイルURLの入力
- カテゴリ・タグの設定
- 公開ステータスの管理（`published` / `review` / `draft`）
- 公開日時の設定
- 記事の検索・絞り込み（実装状況に応じて利用）

### カテゴリ・タグ管理

- カテゴリ一覧・管理画面
- タグ一覧・管理画面
- 記事入力画面でのカテゴリ・タグの選択
- カテゴリ候補の絞り込み、タグの複数選択

## 使用技術

| 分類 | 技術 |
| --- | --- |
| フレームワーク | Next.js（App Router）、React |
| 言語 | TypeScript |
| UI | Material UI（MUI） |
| フォーム | React Hook Form |
| バリデーション | Zod |
| 日付入力 | MUI Date Pickers、Day.js |
| モックAPI | JSON Server |

## 起動方法

### 1. 依存パッケージをインストール

```bash
npm install
```

### 2. JSON Serverを起動

`db.json` がプロジェクト直下にある場合の例です。

```bash
npm run server
```

APIの例：`http://localhost:2001/articles`

### 3. Next.jsを起動

別のターミナルで以下を実行します。

```bash
npm run dev
```

ブラウザから `http://localhost:3000` にアクセスしてください（ポートを変更している場合はそのURLを使用）。

> **注意:** APIのURLが `http://localhost:2001` に固定されている実装では、JSON Serverもポート2001で起動してください。実際の起動コマンドや環境変数が異なる場合は、プロジェクトの設定に合わせて変更してください。

## 画面構成

| パス | 内容 |
| --- | --- |
| `/articles` | 記事一覧 |
| `/articles/new` | 記事の新規作成 |
| `/articles/[id]/edit` | 記事の編集 |
| `/categories` | カテゴリ管理 |
| `/tags` | タグ管理 |

## API構成（JSON Server）

| メソッド | エンドポイント | 用途 |
| --- | --- | --- |
| GET | `/articles` | 記事一覧取得 |
| GET | `/articles/:id` | 記事詳細取得 |
| POST | `/articles` | 記事登録 |
| PATCH / PUT | `/articles/:id` | 記事更新 |
| DELETE | `/articles/:id` | 記事削除 |
| GET | `/categories` | カテゴリ一覧取得 |
| GET | `/tags` | タグ一覧取得 |

カテゴリ・タグの登録・更新・削除についても、画面実装に応じてJSON Serverの標準REST APIを利用します。

## データ形式

`db.json` では `articles`、`categories`、`tags` の3コレクションを管理します。

### 記事の例

```json
{
  "id": "1",
  "title": "イベント開催のお知らせ",
  "slug": "event-announcement",
  "summary": "イベントの開催情報です。",
  "content": "記事本文",
  "categoryCode": "event",
  "tagCodes": ["event", "featured"],
  "status": "published",
  "publishAt": "2026/11/06 10:00:00",
  "author": "編集部",
  "thumbnailUrl": "",
  "createdAt": "2026/11/05 09:00:00",
  "updatedAt": "2026/11/06 10:00:00"
}
```

### 日付フォーマット

- 記事（`publishAt` / `createdAt` / `updatedAt`）：`YYYY/MM/DD HH:mm:ss`
- カテゴリ・タグの日時項目：`YYYY/MM/DD`
- 公開日時が未設定の場合：空文字列 `""` を使用

## 実装上のポイント

- Next.js App Routerによるページ構成と画面遷移
- React Hook FormとZodを利用した入力状態・バリデーション管理
- カスタムフック等を用いたAPI取得処理の分離
- MUIコンポーネントによる入力UIと管理画面の構築
- JSON ServerによるデータのCRUD操作
