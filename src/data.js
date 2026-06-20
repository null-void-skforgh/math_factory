// ============================================================
// 大学受験数学・解法データベース
// ------------------------------------------------------------
// 1問のスキーマ:
//   id, univ, year, stream("理系"|"文系"|"共通"), qno,
//   field("ia"|"iib"|"iiic"), topic, level(1-5), pattern,
//   title, statement, steps, answer, insight
// 問題を増やすときは problems 配列に1件足すだけ。
// 大学ページ・分野ページは自動で増える。
// statement / steps.math は TeX（\\ は2つ重ね）。
// answer は $...$ で数式を囲む混在テキスト。
// ============================================================

export const problems = [
  {
    id: "p001", univ: "一橋大学", year: 2021, stream: "文系", qno: 2,
    field: "iib", topic: "三角関数", level: 3,
    pattern: "対称な位相のズレは「合成」より「和積で潰す」を疑う",
    title: "和積公式による最大値",
    statement: "f(\\theta)=\\sin\\theta+\\sin\\left(\\theta+\\dfrac{2\\pi}{3}\\right)+\\sin\\left(\\theta+\\dfrac{4\\pi}{3}\\right) の最大値を求めよ。",
    steps: [
      { do: "後ろ2項を和積でまとめる", math: "\\sin\\!\\left(\\theta+\\tfrac{2\\pi}{3}\\right)+\\sin\\!\\left(\\theta+\\tfrac{4\\pi}{3}\\right)=2\\sin(\\theta+\\pi)\\cos\\tfrac{\\pi}{3}" },
      { do: "係数を整理する", math: "=2\\sin(\\theta+\\pi)\\cdot\\tfrac12=-\\sin\\theta" },
      { do: "全体を合算すると恒等的に0", math: "f(\\theta)=\\sin\\theta-\\sin\\theta=0" },
    ],
    answer: "恒等的に $f(\\theta)=0$。最大値は $0$",
    insight: "120°ずつズレた3つの正弦波は常に打ち消し合う。三相交流と同じ構造。",
  },
  {
    id: "p002", univ: "東京大学", year: 2023, stream: "理系", qno: 3,
    field: "iiic", topic: "積分", level: 4,
    pattern: "区間 [0,a] に x が邪魔して入っているなら x→a−x を試す",
    title: "King Property の置換",
    statement: "I=\\displaystyle\\int_0^{\\pi}\\dfrac{x\\sin x}{1+\\cos^2 x}\\,dx を求めよ。",
    steps: [
      { do: "x を π−x に置換する", math: "I=\\int_0^{\\pi}\\frac{(\\pi-x)\\sin x}{1+\\cos^2 x}\\,dx" },
      { do: "元の I と足して x を消す", math: "2I=\\pi\\int_0^{\\pi}\\frac{\\sin x}{1+\\cos^2 x}\\,dx" },
      { do: "t=\\cos x で置換積分", math: "=\\pi\\int_{-1}^{1}\\frac{dt}{1+t^2}=\\pi\\cdot\\frac{\\pi}{2}" },
    ],
    answer: "$I=\\dfrac{\\pi^2}{4}$",
    insight: "被積分関数の x を消したいときの定石。対称区間との相性が抜群。",
  },
  {
    id: "p003", univ: "京都大学", year: 2022, stream: "理系", qno: 2,
    field: "ia", topic: "整数", level: 3,
    pattern: "2式のGCDは「差をとる」で次数を下げる",
    title: "互いに素と背理法",
    statement: "n を自然数とする。n^2+1 と n^2+n+1 が互いに素であることを示せ。",
    steps: [
      { do: "差をとって公約数 d の正体を絞る", math: "(n^2+n+1)-(n^2+1)=n \\Rightarrow d\\mid n" },
      { do: "d|n を元の式に戻す", math: "d\\mid n^2+1 \\text{ かつ } d\\mid n^2 \\Rightarrow d\\mid 1" },
      { do: "公約数は1のみ", math: "\\therefore \\gcd=1" },
    ],
    answer: "互いに素であることが示された",
    insight: "ユークリッドの互除法の精神。多項式でも「引き算で次数を落とす」。",
  },
  {
    id: "p004", univ: "名古屋大学", year: 2022, stream: "文系", qno: 1,
    field: "iib", topic: "数列", level: 2,
    pattern: "a_{n+1}−a_n が n の式 → 階差数列の和",
    title: "階差から一般項",
    statement: "a_1=1,\\; a_{n+1}=a_n+2n のとき一般項 a_n を求めよ。",
    steps: [
      { do: "階差数列を取り出す", math: "b_n=a_{n+1}-a_n=2n" },
      { do: "n≧2 で階差の和を作る", math: "a_n=a_1+\\sum_{k=1}^{n-1}2k=1+n(n-1)" },
      { do: "n=1 でも成立を確認", math: "a_n=n^2-n+1" },
    ],
    answer: "$a_n=n^2-n+1$",
    insight: "階差を使ったら必ず初項で検算する。これを忘れると減点される。",
  },
  {
    id: "p005", univ: "東京工業大学", year: 2021, stream: "理系", qno: 4,
    field: "iiic", topic: "極限", level: 4,
    pattern: "n乗の和の n乗根 → 最大項で上下からはさむ",
    title: "はさみうちの設計",
    statement: "\\displaystyle\\lim_{n\\to\\infty}\\sqrt[n]{1^n+2^n+\\cdots+n^n} を求めよ。",
    steps: [
      { do: "最大項 n^n で下からおさえる", math: "\\sqrt[n]{n^n}=n \\le \\sqrt[n]{\\textstyle\\sum k^n}" },
      { do: "全項を n^n で上からおさえる", math: "\\sqrt[n]{\\textstyle\\sum k^n}\\le \\sqrt[n]{n\\cdot n^n}=n\\sqrt[n]{n}" },
      { do: "両端の極限を一致させる", math: "n\\sqrt[n]{n}\\to n\\cdot1,\\;\\text{比は}\\to1" },
    ],
    answer: "発散（$\\sim n$）。比 $\\sqrt[n]{\\sum k^n}/n \\to 1$",
    insight: "和の中で支配的な項を見抜くのが核心。最大項が全体を決める。",
  },
  {
    id: "p006", univ: "早稲田大学", year: 2023, stream: "理系", qno: 1,
    field: "ia", topic: "確率", level: 2,
    pattern: "「少なくとも1回」は余事象（1回も出ない）を引く",
    title: "余事象で数える",
    statement: "サイコロを4回投げて、少なくとも1回6が出る確率を求めよ。",
    steps: [
      { do: "6が1回も出ない確率", math: "\\left(\\tfrac56\\right)^4=\\tfrac{625}{1296}" },
      { do: "全体から引く", math: "1-\\tfrac{625}{1296}=\\tfrac{671}{1296}" },
    ],
    answer: "$\\dfrac{671}{1296}$",
    insight: "「少なくとも」を見たら反射的に余事象。直接数えると場合分け地獄。",
  },
  {
    id: "p007", univ: "大阪大学", year: 2022, stream: "理系", qno: 2,
    field: "iib", topic: "微分", level: 3,
    pattern: "解の個数は y=f(x) と y=a の交点数に翻訳",
    title: "文字定数の分離",
    statement: "方程式 x^3-3x=a が異なる3つの実数解をもつ a の範囲を求めよ。",
    steps: [
      { do: "定数 a を分離し関数とみなす", math: "g(x)=x^3-3x,\\quad y=a" },
      { do: "極値を求める", math: "g'(x)=3x^2-3=0\\Rightarrow x=\\pm1" },
      { do: "極大・極小の間に a があればよい", math: "g(-1)=2,\\;g(1)=-2" },
    ],
    answer: "$-2<a<2$",
    insight: "「解の個数」は必ずグラフの交点に言い換える。定数分離が王道。",
  },
  {
    id: "p008", univ: "慶應義塾大学", year: 2023, stream: "理系", qno: 3,
    field: "iiic", topic: "複素数", level: 3,
    pattern: "回転と拡大は「複素数の掛け算」一発",
    title: "回転の合成",
    statement: "複素数平面上で点 z を原点まわりに 60° 回転し、さらに 2 倍に拡大した点を w とする。w を z で表せ。",
    steps: [
      { do: "回転＝単位複素数の掛け算", math: "\\text{60°回転}=\\cos60°+i\\sin60°=\\tfrac12+\\tfrac{\\sqrt3}{2}i" },
      { do: "拡大は実数倍", math: "w=2\\left(\\tfrac12+\\tfrac{\\sqrt3}{2}i\\right)z" },
      { do: "整理", math: "w=(1+\\sqrt3\\,i)z" },
    ],
    answer: "$w=(1+\\sqrt3\\,i)z$",
    insight: "幾何の回転・拡大は複素数の積に完全対応。図を描かず計算で済む。",
  },
];

export const fieldLabels = { ia: "数I・A", iib: "数II・B", iiic: "数III・C" };

export const slugify = (s) => encodeURIComponent(String(s).trim().replace(/\s+/g, "-"));

export function byUniversity() {
  const map = new Map();
  for (const p of problems) {
    if (!map.has(p.univ)) map.set(p.univ, new Map());
    const years = map.get(p.univ);
    if (!years.has(p.year)) years.set(p.year, []);
    years.get(p.year).push(p);
  }
  return [...map.entries()]
    .map(([univ, years]) => ({
      univ,
      count: [...years.values()].reduce((a, b) => a + b.length, 0),
      years: [...years.entries()]
        .map(([year, items]) => ({ year, items: items.sort((a, b) => a.qno - b.qno) }))
        .sort((a, b) => b.year - a.year),
    }))
    .sort((a, b) => a.univ.localeCompare(b.univ, "ja"));
}

export function byTopic() {
  const map = new Map();
  for (const p of problems) {
    if (!map.has(p.topic)) map.set(p.topic, []);
    map.get(p.topic).push(p);
  }
  return [...map.entries()]
    .map(([topic, items]) => ({ topic, field: items[0].field, items: items.sort((a, b) => a.level - b.level) }))
    .sort((a, b) => a.field.localeCompare(b.field) || a.topic.localeCompare(b.topic, "ja"));
}

export function byPattern() {
  const map = new Map();
  for (const p of problems) {
    if (!map.has(p.pattern)) map.set(p.pattern, []);
    map.get(p.pattern).push(p);
  }
  return [...map.entries()].map(([pattern, items]) => ({ pattern, items }));
}

export function problemsOfUniv(univSlug) {
  const decoded = decodeURIComponent(univSlug);
  return problems.filter((p) => p.univ === decoded);
}
export function problemsOfTopic(topicSlug) {
  const decoded = decodeURIComponent(topicSlug);
  return problems.filter((p) => p.topic === decoded);
}

export const stats = {
  problemCount: problems.length,
  univCount: new Set(problems.map((p) => p.univ)).size,
  topicCount: new Set(problems.map((p) => p.topic)).size,
  patternCount: new Set(problems.map((p) => p.pattern)).size,
};
