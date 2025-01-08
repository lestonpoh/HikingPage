import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import SectionItem from "../components/SectionItem";
import { ChangeEvent, MouseEvent, useState } from "react";
import Dropdown from "../components/Dropdown";

const CreateEditHike = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    name: "",
    elevation: "",
    difficulty: "",
    duration: "",
    location: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const locationOnSelect = (location: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      location: location,
    }));
  };
  const submitOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto mt-12 px-5">
        <form>
          <div className="grid gap-5 md:grid-cols-2">
            <SectionItem
              label={<label htmlFor="name">Name</label>}
              body={
                <input
                  id="name"
                  className="input"
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                />
              }
            />
            <SectionItem
              label={<label htmlFor="name">Elevation (m)</label>}
              body={
                <input
                  id="elevation"
                  className="input"
                  type="number"
                  placeholder="Enter elevation in meters"
                  name="elevation"
                  value={formValues.elevation}
                  onChange={handleChange}
                />
              }
            />
            <SectionItem
              label={<label htmlFor="difficulty">Difficulty (out of 5)</label>}
              body={
                <input
                  id="difficulty"
                  className="input"
                  type="number"
                  placeholder="Enter difficulty (out of 5)"
                  name="difficulty"
                  value={formValues.difficulty}
                  onChange={handleChange}
                />
              }
            />
            <SectionItem
              label={<label htmlFor="duration">Duration (hours)</label>}
              body={
                <input
                  id="duration"
                  className="input"
                  type="number"
                  placeholder="Enter duration"
                  name="duration"
                  value={formValues.duration}
                  onChange={handleChange}
                />
              }
            />

            <SectionItem
              label={<label htmlFor="">Location</label>}
              body={
                <Dropdown
                  options={["singapore", "malaysi", "china", "india"]}
                  onSelected={locationOnSelect}
                />
              }
            />
          </div>

          <div className="flex justify-end mt-6">
            {formValues.location}
            <button className="button" onClick={submitOnClick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEditHike;
