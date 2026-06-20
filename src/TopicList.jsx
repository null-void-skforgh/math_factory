import { Link } from "react-router-dom";
import { byTopic, fieldLabels, slugify } from "./data";

export default function TopicList() {
  const topics = byTopic();
  // 分野を field でグループ化
  const groups = {};
  for (const t of topics) {
    (groups[t.field] ||= []).push(t);
  }

  return (
    <section className="section">
      <div className="crumb">
        <Link to="/">解法索引</Link> <span>/</span> 分野
      </div>
      <div className="sec-head">
        <span className="idx">B</span>
        <h2>分野から</h2>
      </div>
      <p className="sec-sub">分野を横断して同じ型の問題を集める。大学や年度をまたいで並ぶ。</p>

      {Object.entries(groups).map(([field, ts]) => (
        <div key={field} className="topic-group">
          <div className="topic-group-head">{fieldLabels[field]}</div>
          <div className="topic-grid">
            {ts.map((t) => (
              <Link key={t.topic} to={`/topic/${slugify(t.topic)}`} className="topic-tile">
                <div className="topic-tile-name">{t.topic}</div>
                <div className="topic-tile-count">{t.items.length} 問</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
