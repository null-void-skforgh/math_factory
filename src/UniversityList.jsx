import { Link } from "react-router-dom";
import { byUniversity, slugify } from "./data";

export default function UniversityList() {
  const universities = byUniversity();
  return (
    <section className="section">
      <div className="crumb">
        <Link to="/">解法索引</Link> <span>/</span> 大学・年度
      </div>
      <div className="sec-head">
        <span className="idx">A</span>
        <h2>大学・年度から</h2>
      </div>
      <p className="sec-sub">大学を選ぶと、年度・系統ごとに整理された問題が並ぶ。</p>

      <div className="univ-list">
        {universities.map((u) => (
          <Link key={u.univ} to={`/university/${slugify(u.univ)}`} className="univ-row">
            <div className="univ-name">{u.univ}</div>
            <div className="univ-years">
              {u.years.map((y) => (
                <span key={y.year} className="year-pill">
                  {y.year}
                </span>
              ))}
            </div>
            <div className="univ-count">{u.count} 問 →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
