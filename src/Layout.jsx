import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Layout() {
  const { pathname } = useLocation();

  // ページ遷移で先頭へ
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

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

  return (
    <>
      <div className="grid-bg" />
      <header className="masthead">
        <Link className="mark" to="/">
          解法<span className="red">索引</span>
        </Link>
        <nav className="nav">
          <NavLink to="/universities" className="navlink">
            大学・年度
          </NavLink>
          <NavLink to="/topics" className="navlink">
            分野
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="foot">
        <div className="big">型を一つ覚えるたび、解ける問題が一群ずつ増える。</div>
        <div className="note">
          解法索引 — SOLUTION INDEX
          <br />
          大学受験数学・解法パターンDB
          <br />
          built with react · react-router · gsap · katex
        </div>
      </footer>
    </>
  );
}
