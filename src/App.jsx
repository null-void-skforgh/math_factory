import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import UniversityList from "./UniversityList";
import UniversityDetail from "./UniversityDetail";
import TopicList from "./TopicList";
import TopicDetail from "./TopicDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="universities" element={<UniversityList />} />
        <Route path="university/:univSlug" element={<UniversityDetail />} />
        <Route path="topics" element={<TopicList />} />
        <Route path="topic/:topicSlug" element={<TopicDetail />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
