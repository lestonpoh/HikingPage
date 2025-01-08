import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import SectionItem from "../components/SectionItem";

const CreateEditHike = () => {
  const { id } = useParams();
  function SubmitOnClick(event: any) {
    event.preventDefault();
  }

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto mt-12 px-5">
        <form>
          <div className="grid gap-5 md:grid-cols-2">
            <SectionItem
              label="Name"
              body={
                <input className="input" type="text" placeholder="Enter name" />
              }
            />
            <SectionItem
              label="Elevation (m)"
              body={
                <input
                  className="input"
                  type="number"
                  placeholder="Enter elevation in meters"
                />
              }
            />
            <SectionItem
              label="Difficulty"
              body={
                <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter difficulty (out of 5)"
                  />
                  <div>/ 5</div>
                </div>
              }
            />
            <SectionItem
              label="Duration (hours)"
              body={
                <input
                  className="input"
                  type="number"
                  placeholder="Enter duration"
                />
              }
            />
          </div>

          <div className="flex justify-end mt-6">
            <button className="button" onClick={SubmitOnClick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEditHike;
