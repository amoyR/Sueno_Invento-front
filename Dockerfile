# ベースイメージとしてNode.jsを使用
FROM arm64v8/node:20-alpine

WORKDIR /app

# 依存関係をインストール
COPY src/package.json src/package-lock.json ./
RUN npm install

# アプリケーションファイルのコピー
COPY src ./

# 開発サーバーを起動
CMD ["npm", "run", "dev"]