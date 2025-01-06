import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../layout/Layout";

const CreateEditHike = () => {
  const { id } = useParams();
  function SubmitOnClick() {}

  return (
    <Layout>
      <form>
        <Button color="primary" onClick={SubmitOnClick}>
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default CreateEditHike;
