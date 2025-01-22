import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import SectionItem from "../components/SectionItem";
import { ChangeEvent, MouseEvent, useState } from "react";
import Dropdown from "../components/Dropdown";
import { countriesList } from "../data/countries";
import axiosInstance from "../services/axiosInstance";
const AddPost = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    description: "",
    location: "",
    elevation: "",
    difficulty: "",
    duration: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const locationOnSelect = (location: string) => {
    setInputs((prevValues) => ({
      ...prevValues,
      location: location,
    }));
  };

  const submitOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      inputs.description === "" ||
      inputs.elevation === "" ||
      inputs.difficulty === "" ||
      inputs.duration === "" ||
      inputs.location === ""
    ) {
      alert("error");
      return;
    }
    axiosInstance
      .post("/posts", inputs)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto mt-12 px-5">
        <form>
          <div className="grid gap-5 md:grid-cols-2">
            <SectionItem
              label={<label htmlFor="description">description</label>}
              body={
                <input
                  id="description"
                  className="input"
                  type="text"
                  placeholder="Enter description"
                  name="description"
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
                  onChange={handleChange}
                />
              }
            />

            <SectionItem
              label={<label htmlFor="">Location</label>}
              body={
                <Dropdown
                  options={countriesList}
                  onSelected={locationOnSelect}
                />
              }
            />
          </div>
          <div className="flex justify-end mt-6">
            <button className="button" onClick={submitOnClick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPost;
