import { useParams, Link } from "react-router-dom";
import { byUniversity } from "./data";
import ProblemCard from "./ProblemCard";

export default function UniversityDetail() {
  const { univSlug } = useParams();
  const decoded = decodeURIComponent(univSlug);
  const u = byUniversity().find((x) => x.univ === decoded);

  if (!u) {
    return (
      <section className="section">
        <div className="empty">
          その大学の問題はまだありません。
          <Link to="/universities">大学一覧へ戻る</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="crumb">
        <Link to="/">解法索引</Link> <span>/</span>{" "}
        <Link to="/universities">大学・年度</Link> <span>/</span> {u.univ}
      </div>
      <div className="sec-head">
        <span className="idx">{u.count}問</span>
        <h2>{u.univ}</h2>
      </div>
      <p className="sec-sub">年度・系統ごとに大問が並ぶ。各カードは分野ページにも繋がっている。</p>

      {u.years.map((y) => (
        <div key={y.year} className="year-block">
          <div className="year-head">
            <span className="year-num">{y.year}</span>
            <span className="year-line" />
          </div>
          <div className="cards">
            {y.items.map((p) => (
              <ProblemCard key={p.id} p={p} showMeta={false} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
