import Layout from "../layout/Layout.tsx";
import HikesList from "../components/hikes/HikesList.tsx";
import "./Hikes.css";

function Hikes() {
  return (
    <div>
      <Layout>
        <HikesList />
      </Layout>
    </div>
  );
}

export default Hikes;
