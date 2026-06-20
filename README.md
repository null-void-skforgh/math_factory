# 解法索引 — 大学受験数学・解法パターンDB

Vite + React + React Router + GSAP + Lenis + KaTeX で構築した、複数ページの解法データベース。

## ページ構成
- `/` トップ（2つの入り口）
- `/universities` 大学一覧 → `/university/:大学名` 大学詳細（年度・系統別）
- `/topics` 分野一覧 → `/topic/:分野名` 分野詳細（横断・難易度順）

同じ問題が大学・年度からも分野からもたどれる。

## 開発
```
npm install
npm run dev
```

## 問題を増やす
`src/data.js` の `problems` 配列に1件足すだけ。大学ページ・分野ページは自動で増える。

1問のスキーマ:
```js
{
  id: "p009",            // 一意なID
  univ: "北海道大学",     // 大学名
  year: 2024,            // 年度
  stream: "理系",        // "理系" | "文系" | "共通"
  qno: 3,                // 大問番号
  field: "iib",          // "ia" | "iib" | "iiic"
  topic: "ベクトル",      // 分野名
  level: 3,              // 難易度 1〜5
  pattern: "この形を見たらこう動かす、の一行",
  title: "短い見出し",
  statement: "問題文。数式は \\sin x のように TeX（\\ は2つ重ね）",
  steps: [ { do: "やること", math: "TeX" } ],
  answer: "答え。数式は $x=1$ のように $ で囲む",
  insight: "なぜこの型が効くか、の一言",
}
```
注意: `statement`/`steps.math` は TeX で `\\` を2つ重ねる。`answer` は `$...$` で数式を囲む混在テキスト。

## デプロイ（Vercel）
`vercel.json` にSPA用のrewriteを設定済み。GitHubにpush → Vercelが自動ビルド。
ビルドコマンド `npm run build` / 出力 `dist`（自動検出される）。

## 設計（脱AIっぽさ）
配色は単色（ニアブラック）＋1アクセント（シナバー朱＝添削の赤ペン）。
グラデ・絵文字・左端カラーバーは不使用。数式はKaTeXで本物組版。
