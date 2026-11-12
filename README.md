
# News Studio | 記事管理CMS

Next.js（App Router）とTypeScriptを使用して開発した、記事管理CMSです。

記事の作成・編集・削除を中心に、カテゴリ・タグ管理、検索、プレビューなど、CMSの基本的な機能を実装しています。

フロントエンド開発スキルの向上を目的とした個人開発プロジェクトであり、コンポーネント設計、フォーム管理、API連携、型安全性を意識して制作しました。

## デモ・ソースコード

- **デモサイト**：https://article-cms-inky.vercel.app/articles
- **GitHub**：https://github.com/ryu929ful/article-cms

※ デモサイトのデータ取得・更新には外部APIを使用します。APIの稼働状況によっては、データの表示や操作に時間がかかる場合があります。

## 主な機能

### 1. 記事管理

- 記事一覧の表示
- 記事の新規登録（POST）
- 記事の編集（PATCH）
- 記事の削除（DELETE）
- 記事のプレビュー
- タイトル・スラッグ・概要・本文・著者の入力
- カテゴリ・タグの設定
- 公開ステータスの管理（公開・レビュー・下書き）
- 公開予定日時の設定
- フリーワード検索
- カテゴリ・公開ステータスによる絞り込み
- 記事件数のサマリー表示

### 2. カテゴリ管理

- カテゴリ一覧表示
- カテゴリの新規登録
- カテゴリの編集・削除
- 記事登録時のカテゴリ選択
- 入力文字によるカテゴリ候補の絞り込み

### 3. タグ管理

- タグ一覧表示
- タグの新規登録
- タグの編集・削除
- 記事登録時のタグ選択
- 複数タグの選択

### 4. フォーム管理

React Hook FormとZodを組み合わせ、フォームの状態管理と入力値の検証を実装しています。

- 必須項目のバリデーション
- エラーメッセージの表示
- 編集時の初期値設定
- フォームの共通コンポーネント化
- TypeScriptによる入力データの型管理

### 5. API連携

JSON Serverを使用し、REST API形式でデータを管理しています。

- 非同期通信によるデータ取得
- 記事・カテゴリ・タグのCRUD操作
- カスタムフックによるデータ取得処理の分離
- ローディング状態の管理
- APIエラー時のエラーハンドリング

## 使用技術

| 分類 | 技術 |
| --- | --- |
| フレームワーク | Next.js 16（App Router）/ React |
| 言語 | TypeScript |
| UIライブラリ | Material UI（MUI）/ MUI Icons |
| フォーム管理 | React Hook Form |
| バリデーション | Zod / zodResolver |
| 日付入力 | MUI Date Pickers / Day.js |
| API通信 | Fetch API / async・await |
| データ取得 | カスタムフック |
| モックAPI | JSON Server |
| フロントエンド公開 | Vercel |
| API公開 | Render |
| バージョン管理 | Git / GitHub |

## 画面構成

| パス | 内容 |
| --- | --- |
| `/articles` | 記事一覧 |
| `/articles/new` | 記事の新規作成 |
| `/articles/edit?id=1` | 記事の編集 |
| `/articles/preview?id=1` | 記事プレビュー |
| `/articles/categories` | カテゴリ管理 |
| `/articles/tags` | タグ管理 |
| `/media` | メディア管理画面 |
| `/media/new` | メディア登録画面 |

※ メディア関連画面は開発中の機能を含みます。

## ディレクトリ構成

```text
src/
├── app/                  # Next.js App Router
│   ├── articles/
│   │   ├── page.tsx
│   │   ├── new/
│   │   ├── edit/
│   │   ├── preview/
│   │   ├── categories/
│   │   └── tags/
│   └── media/
│       ├── page.tsx
│       └── new/
│
├── components/           # 共通UI・記事関連コンポーネント
│   ├── ArticleList.tsx
│   ├── ArticleCreate.tsx
│   ├── ArticleEdit.tsx
│   ├── BasicForm.tsx
│   ├── SettingForm.tsx
│   └── Shell.tsx
│
├── features/
│   └── media/            # メディア関連機能
│
├── hooks/                # データ取得用カスタムフック
│   ├── useArticleList.tsx
│   ├── useCategoryList.tsx
│   └── useTagList.tsx
│
├── lib/
│   └── crud/             # API通信処理
│
├── types/                # TypeScript型定義
└── validation/           # Zodバリデーション
```

## API構成

JSON Serverを使用して、REST API形式の通信を実装しています。

| メソッド | エンドポイント | 用途 |
| --- | --- | --- |
| GET | `/articles` | 記事一覧取得 |
| GET | `/articles/:id` | 記事詳細取得 |
| POST | `/articles` | 記事登録 |
| PATCH | `/articles/:id` | 記事更新 |
| DELETE | `/articles/:id` | 記事削除 |
| GET | `/categories` | カテゴリ一覧取得 |
| POST | `/categories` | カテゴリ登録 |
| PATCH | `/categories/:id` | カテゴリ更新 |
| DELETE | `/categories/:id` | カテゴリ削除 |
| GET | `/tags` | タグ一覧取得 |
| POST | `/tags` | タグ登録 |
| PATCH | `/tags/:id` | タグ更新 |
| DELETE | `/tags/:id` | タグ削除 |

## データ構造

記事データは以下の形式で管理しています。

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
  "publishAt": "2026-11-06",
  "author": "編集部",
  "thumbnailUrl": "",
  "createdAt": "2026/11/05 09:00:00",
  "updatedAt": "2026/11/06 10:00:00"
}
```

### 主なプロパティ

| プロパティ | 型 | 説明 |
| --- | --- | --- |
| `id` | string | 記事ID |
| `title` | string | 記事タイトル |
| `slug` | string | URL用識別子 |
| `summary` | string | 記事概要 |
| `content` | string | 記事本文 |
| `categoryCode` | string | カテゴリコード |
| `tagCodes` | string[] | タグコード一覧 |
| `status` | string | 公開ステータス |
| `publishAt` | string / null | 公開予定日 |
| `author` | string | 著者 |
| `thumbnailUrl` | string | サムネイルURL |

## 実装で意識したこと

### コンポーネントの責務分離

記事一覧、記事登録、記事編集など、機能単位でコンポーネントを分割しています。

また、フォームの共通部分を再利用することで、重複コードの削減と保守性の向上を意識しました。

### TypeScriptによる型安全性

記事・カテゴリ・タグのデータ構造を型定義し、コンポーネント間で受け渡す値の整合性を保つようにしています。

フォーム入力についてはZodによるバリデーションを組み合わせています。

### API通信処理の分離

API通信に関する処理をUIコンポーネントから分離し、カスタムフックや関数として管理しています。

これにより、表示処理とデータ取得処理の責務を整理しています。

### 静的エクスポートへの対応

Next.jsの静的エクスポートに対応するため、記事編集画面では動的ルートではなく、クエリパラメータによって編集対象を特定しています。

例：

`/articles/edit?id=1`

## ローカル環境での起動方法

### 動作環境

- Node.js 20.9以上（Next.js 16に対応する環境）
- npm

### 1. リポジトリを取得

```bash
git clone https://github.com/ryu929ful/article-cms.git
cd article-cms
```

### 2. 依存パッケージをインストール

```bash
npm install
```

### 3. JSON Serverを起動

```bash
npm run server
```

APIサーバーは、`package.json`で設定されたポートで起動します。

### 4. Next.jsを起動

別のターミナルで以下を実行します。

```bash
npm run dev
```

ブラウザから以下にアクセスします。

http://localhost:3000/articles

## デプロイ構成

フロントエンドはVercel、APIはRenderを使用しています。

```text
GitHub
   │
   ├── Vercel
   │     └── Next.js（CMS画面）
   │
   └── Render
         └── JSON Server（REST API）
```

APIの接続先は、環境変数 `NEXT_PUBLIC_API_URL` で管理する構成を想定しています。

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

※ 上記URLは設定例です。実際のAPIのURLに置き換えてください。

## 現在の制約

本アプリケーションは学習目的で制作しており、以下の機能は未実装です。

- ユーザー認証・権限管理
- 記事の承認ワークフロー
- 公開日時による自動公開
- 記事の変更履歴・差分管理
- 同時編集・更新競合の制御
- リッチテキストエディタ
- 本番運用向けデータベース

また、公開ステータスはCMS内の管理情報であり、Webサイトへの記事配信機能はありません。

JSON Serverを利用したデモ環境では、サーバー再起動などによって登録・更新したデータが初期状態に戻る場合があります。

## 今後の改善予定

1. **メディア管理機能の拡張**
   - 画像アップロード
   - 画像ライブラリ
   - 記事サムネイルとの連携

2. **記事編集機能の拡張**
   - Tiptapによるリッチテキスト編集
   - 本文への画像・リンク挿入

3. **データ取得処理の改善**
   - SWRによるキャッシュ管理
   - ページネーション
   - サーバー側検索

4. **CMS運用機能の追加**
   - 認証・権限管理
   - 記事の変更履歴
   - 承認ワークフロー
   - 多言語対応

## 開発目的

React・Next.js・TypeScriptを使用したフロントエンド開発スキルの向上を目的として制作しました。

特に、以下の技術領域を重点的に学習しています。

- Reactによるコンポーネント設計
- Next.js App Routerによる画面構築
- TypeScriptによる型定義
- React Hook FormとZodによるフォーム管理
- REST APIを利用したCRUD処理
- カスタムフックによる処理の共通化
- 保守性を意識したディレクトリ構成

今後は、実際のCMS運用を想定した機能拡張やバックエンドとの連携を進め、より実務に近いアプリケーションへ改善していく予定です。
