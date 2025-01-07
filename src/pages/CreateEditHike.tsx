import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../layout/Layout";
import SectionItem from "../components/SectionItem";

const CreateEditHike = () => {
  const { id } = useParams();
  function SubmitOnClick() {}

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto mt-12 px-5">
        <form className="flex flex-col gap-2">
          <SectionItem label={<p>Hello</p>} body={<div>jdjj</div>} />
          <div></div>
          <div className="flex justify-end">
            <Button color="primary" onClick={SubmitOnClick}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEditHike;
