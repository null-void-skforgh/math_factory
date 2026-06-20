import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { stats } from "./data";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const heroRef = useRef(null);
  useEffect(() => {
    if (prefersReduced || !heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero .eyebrow", { opacity: 0, y: 14, duration: 0.6 })
        .from(".hero h1", { opacity: 0, y: 24, duration: 0.7 }, "-=0.3")
        .from(".hero .lede", { opacity: 0, y: 18, duration: 0.6 }, "-=0.3")
        .from(".gate", { opacity: 0, y: 20, stagger: 0.12, duration: 0.55 }, "-=0.2")
        .from(".counter", { opacity: 0, y: 14, stagger: 0.08, duration: 0.45 }, "-=0.2");
      gsap.to(".strike-line", { scaleX: 1, duration: 0.7, delay: 0.9, ease: "power2.inOut" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
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
          という反応の型。同じ問題を<em>大学・年度</em>からも<em>分野</em>からもたどれる、
          解法パターンの索引。
        </p>
      </section>

      <section className="gates">
        <Link to="/universities" className="gate">
          <div className="gate-no">A</div>
          <div className="gate-body">
            <h2>大学・年度から</h2>
            <p>大学ごと、年度ごと、理系・文系で問題を引く。本番の出題単位で並ぶ。</p>
            <span className="gate-go">{stats.univCount} 大学 →</span>
          </div>
        </Link>
        <Link to="/topics" className="gate">
          <div className="gate-no">B</div>
          <div className="gate-body">
            <h2>分野から</h2>
            <p>三角関数、整数、積分…。分野を横断して同じ型の問題を集める。</p>
            <span className="gate-go">{stats.topicCount} 分野 →</span>
          </div>
        </Link>
      </section>

      <div className="counters">
        <div className="counter">
          <div className="num">{stats.problemCount}<span className="unit">問</span></div>
          <div className="lab">収録問題</div>
        </div>
        <div className="counter">
          <div className="num">{stats.univCount}<span className="unit">大学</span></div>
          <div className="lab">出題校</div>
        </div>
        <div className="counter">
          <div className="num">{stats.patternCount}<span className="unit">型</span></div>
          <div className="lab">解法パターン</div>
        </div>
      </div>
    </>
  );
}
