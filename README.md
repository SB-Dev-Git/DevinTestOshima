# タスク管理Webアプリケーション

Python（FastAPI）とReact（TypeScript）を使用したタスク管理アプリケーションです。

## 機能

- タスクの作成、表示、編集、削除（CRUD操作）
- タスクのステータス管理（未着手、進行中、完了）
- 期限設定
- レスポンシブデザイン

## 技術スタック

### バックエンド
- Python 3.12
- FastAPI
- Pydantic（データバリデーション）
- インメモリデータベース

### フロントエンド
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui コンポーネント
- Vite（ビルドツール）

## ローカル開発環境のセットアップ

### 前提条件

以下のソフトウェアがインストールされている必要があります：

1. **Python 3.12以上**
   ```bash
   python --version
   ```

2. **Node.js 18以上**
   ```bash
   node --version
   ```

3. **Poetry（Pythonパッケージ管理）**
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

### 1. プロジェクトのクローン

```bash
git clone <リポジトリURL>
cd task-management-app
```

### 2. バックエンドのセットアップ

```bash
# バックエンドディレクトリに移動
cd backend

# 依存関係をインストール
poetry install

# 開発サーバーを起動
poetry run fastapi dev app/main.py
```

バックエンドサーバーは `http://localhost:8000` で起動します。
API仕様書は `http://localhost:8000/docs` で確認できます。

### 3. フロントエンドのセットアップ

新しいターミナルウィンドウを開いて：

```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

フロントエンドサーバーは `http://localhost:5173` で起動します。

### 4. アプリケーションの使用

1. ブラウザで `http://localhost:5173` にアクセス
2. 「新しいタスク」ボタンをクリックしてタスクを作成
3. タスクの編集や削除は各タスクカードのボタンから実行

## API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| GET | `/tasks` | 全タスクの取得 |
| POST | `/tasks` | 新しいタスクの作成 |
| GET | `/tasks/{task_id}` | 特定タスクの取得 |
| PUT | `/tasks/{task_id}` | タスクの更新 |
| DELETE | `/tasks/{task_id}` | タスクの削除 |
| GET | `/healthz` | ヘルスチェック |

## データ構造

### Task
```json
{
  "id": "string",
  "title": "string",
  "description": "string (optional)",
  "status": "todo | in-progress | completed",
  "due_date": "string (optional, YYYY-MM-DD)",
  "created_at": "string (ISO datetime)",
  "updated_at": "string (ISO datetime)"
}
```

## トラブルシューティング

### よくある問題

1. **ポートが既に使用されている**
   ```bash
   # プロセスを確認
   lsof -i :8000  # バックエンド
   lsof -i :5173  # フロントエンド
   
   # プロセスを終了
   kill -9 <PID>
   ```

2. **依存関係のエラー**
   ```bash
   # バックエンド
   cd backend
   poetry install --no-cache
   
   # フロントエンド
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **CORS エラー**
   - バックエンドが正しく起動していることを確認
   - フロントエンドの `.env` ファイルでAPI URLが正しく設定されていることを確認

### 開発のヒント

- バックエンドのコードを変更すると自動的にサーバーが再起動します
- フロントエンドのコードを変更すると自動的にブラウザが更新されます
- データはインメモリに保存されるため、サーバーを再起動するとデータは失われます

## コーディング規約

- Python コードは PEP8 に準拠
- TypeScript/React コードは ESLint 設定に準拠
- コメントは日本語で記述

## 本番環境への展開

本番環境への展開手順については、使用するクラウドプラットフォーム（Azure、AWS、GCP等）の公式ドキュメントを参照してください。

## ライセンス

MIT License
