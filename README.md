# 解法索引 — 大学受験数学・解法パターンDB

Vite + React + GSAP(ScrollTrigger) + Lenis + KaTeX で構築。

## 開発
```
npm install
npm run dev
```

## 構成
- `src/data.js` … 問題データ（出典・難易度・解法の型・手順・答え・着眼点）。ここに追記すれば自動でカードが増える
- `src/App.jsx` … ヒーロー / カウンター / 分野フィルタ / 解法カード
- `src/Tex.jsx` … KaTeX 描画（`Tex`=純数式 / `MixedTex`=$math$混在テキスト）
- `src/app.css` … 配色は単色(ニアブラック)＋1アクセント(シナバー朱)。方眼地紋＋添削赤線がシグネチャ

## 設計の型（脱AIっぽさ）
- グラデ・絵文字・左端カラーバーは不使用
- 数式は KaTeX で本物組版、解法は「型→手順→答」の構造
- スクロールで手順が一行ずつ採点リビール（prefers-reduced-motion で静的化）
