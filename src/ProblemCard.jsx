import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Tex, { MixedTex } from "./Tex";
import { fieldLabels, slugify } from "./data";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ProblemCard({ p, showMeta = true }) {
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
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <article className="card" ref={ref}>
      <div className="aside">
        {showMeta && (
          <div className="src">
            {p.univ} {p.year} · {p.stream} 第{p.qno}問
          </div>
        )}
        <div className="topic">{p.topic}</div>
        <div className="ttl">{p.title}</div>
        <div className="metarow">
          <span className="chip">{fieldLabels[p.field]}</span>
          <Link className="chip link" to={`/topic/${slugify(p.topic)}`}>
            {p.topic}
          </Link>
        </div>
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
