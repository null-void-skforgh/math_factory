import { useParams, Link } from "react-router-dom";
import { problemsOfTopic, fieldLabels } from "./data";
import ProblemCard from "./ProblemCard";

export default function TopicDetail() {
  const { topicSlug } = useParams();
  const items = problemsOfTopic(topicSlug).sort((a, b) => a.level - b.level);

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="empty">
          その分野の問題はまだありません。
          <Link to="/topics">分野一覧へ戻る</Link>
        </div>
      </section>
    );
  }

  const topic = items[0].topic;
  const field = items[0].field;

  return (
    <section className="section">
      <div className="crumb">
        <Link to="/">解法索引</Link> <span>/</span> <Link to="/topics">分野</Link>{" "}
        <span>/</span> {topic}
      </div>
      <div className="sec-head">
        <span className="idx">{fieldLabels[field]}</span>
        <h2>{topic}</h2>
      </div>
      <p className="sec-sub">
        難易度順。大学・年度をまたいで、この分野の解法の型が並ぶ。
      </p>

      <div className="cards">
        {items.map((p) => (
          <ProblemCard key={p.id} p={p} showMeta={true} />
        ))}
      </div>
    </section>
  );
}
