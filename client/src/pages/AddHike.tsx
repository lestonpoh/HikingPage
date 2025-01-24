import { useNavigate, useParams } from "react-router-dom";
import SectionItem from "../components/SectionItem";
import { ChangeEvent, MouseEvent, useState } from "react";
import Dropdown from "../components/Dropdown";
import { countriesList } from "../data/countries";
import axiosInstance from "../services/axiosInstance";
import FileUpload from "../components/FileUpload";

const AddHike = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({
    description: "",
    location: "",
    elevation: "",
    difficulty: "",
    duration: "",
  });

  const [file, setFile] = useState("");

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

  const fileOnUpload = (files: File[]) => {
    if (files.length > 0) setFile(URL.createObjectURL(files[0]));
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
    <div className="max-w-screen-lg mx-auto px-5 mt-10">
      <h1 className="font-bold text-xl mb-6">Add New Hike</h1>
      <form>
        <div className="grid gap-5 md:grid-cols-2">
          <SectionItem
            label={<label htmlFor="description">Description</label>}
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
            label={<label htmlFor="elevation">Elevation (m)</label>}
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
            label={<div>Location</div>}
            body={
              <Dropdown options={countriesList} onSelected={locationOnSelect} />
            }
          />

          <SectionItem
            label="Upload Images"
            body={
              <FileUpload
                onFilesSelected={(files) => {
                  fileOnUpload(files);
                }}
              />
            }
            className="col-[1/3]"
          />
          <div>
            <img src={file} alt="" />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="button" onClick={submitOnClick}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHike;
