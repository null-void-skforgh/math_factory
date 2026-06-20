import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "katex/dist/katex.min.css";
import "./app.css";
import { problems, fields, stats } from "./data";
import Tex, { MixedTex } from "./Tex";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Card({ p }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReduced || !ref.current) return;
    const steps = ref.current.querySelectorAll(".step");
    const ctx = gsap.context(() => {
      gsap.to(steps, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <article className="card" ref={ref}>
      <div className="aside">
        <div className="src">{p.source}</div>
        <div className="topic">{p.topic}</div>
        <div className="ttl">{p.title}</div>
        <div className="level" aria-label={`難易度 ${p.level}/5`}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={n <= p.level ? "on" : ""} />
          ))}
        </div>
      </div>
      <div className="body">
        <div className="stmt">
          <Tex tex={p.statement} block />
        </div>
        <div className="pattern">
          <span className="tag">解法の型</span>
          <span>{p.pattern}</span>
        </div>
        <div className="steps">
          {p.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="no">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <div className="do">{s.do}</div>
                <div className="math">
                  <Tex tex={s.math} block />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="answer">
          <span className="lab">答</span>
          <span className="val">
            <MixedTex text={p.answer} />
          </span>
        </div>
        <p className="insight">{p.insight}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const heroRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    if (prefersReduced || !heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero .eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(".hero h1", { opacity: 0, y: 24, duration: 0.7 }, "-=0.3")
        .from(".hero .lede", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
        .from(".counter", { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 }, "-=0.2");
      gsap.to(".strike-line", {
        scaleX: 1,
        duration: 0.7,
        delay: 0.9,
        ease: "power2.inOut",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? problems : problems.filter((p) => p.field === filter)),
    [filter]
  );

  return (
    <>
      <div className="grid-bg" />
      <header className="masthead">
        <div className="mark">
          解法<span className="red">索引</span>
        </div>
        <div className="meta">大学受験数学 / 解法パターン・データベース</div>
      </header>

      <section className="hero" ref={heroRef}>
        <div className="eyebrow">Solution Index — 解き方の地図</div>
        <h1>
          答えではなく、
          <br />
          <span className="strike">
            手の動かし方
            <span className="strike-line" />
          </span>
          を残す。
        </h1>
        <p className="lede">
          受験数学で本当に効くのは、解答ではなく<em>「この形を見たら、こう動かす」</em>
          という反応の型。このデータベースは問題を出典でも難易度でもなく、
          <em>解法パターン</em>で索引化する。同じ型は分野をまたいで効く。
        </p>
      </section>

      <div className="counters">
        <div className="counter">
          <div className="num">
            {stats.problemCount}
            <span className="unit">問</span>
          </div>
          <div className="lab">収録問題</div>
        </div>
        <div className="counter">
          <div className="num">
            {stats.patternCount}
            <span className="unit">型</span>
          </div>
          <div className="lab">解法パターン</div>
        </div>
        <div className="counter">
          <div className="num">
            {stats.topicCount}
            <span className="unit">分野</span>
          </div>
          <div className="lab">カバー範囲</div>
        </div>
      </div>

      <section className="section">
        <div className="sec-head">
          <span className="idx">01</span>
          <h2>解法カード</h2>
        </div>
        <p className="sec-sub">
          各カードは「どんな形か → どの型で潰すか → 手順」で構成。
          スクロールすると手順が一行ずつ採点されるように現れる。
        </p>

        <div className="filters" role="group" aria-label="分野で絞り込み">
          {fields.map((f) => (
            <button
              key={f.id}
              className={`filter ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="cards">
          {filtered.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </section>

      <footer className="foot">
        <div className="big">型を一つ覚えるたび、解ける問題が一群ずつ増える。</div>
        <div className="note">
          解法索引 — SOLUTION INDEX
          <br />
          サンプル {stats.problemCount} 問収録 / 拡張可能
          <br />
          built with react · gsap · katex
        </div>
      </footer>
    </>
  );
}
