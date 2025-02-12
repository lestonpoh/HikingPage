import { useNavigate, useParams } from "react-router-dom";
import SectionItem from "../components/SectionItem";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import { countriesList } from "../data/countries";
import axiosInstance from "../services/axiosInstance";
import FileUpload from "../components/FileUpload";
import { HikeDetail } from "../interface/HikeDetailsInterface";

const AddHike = () => {
  const { name } = useParams();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hikeName, setHikeName] = useState("");
  const [hikeId, setHikeId] = useState<number>();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    location: "",
    elevation: "",
    difficulty: "",
    duration: "",
  });
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [coverFile, setCoverFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const locationOnSelect = (location: string) => {
    setInputs((prevValues) => ({
      ...prevValues,
      location: location,
    }));
  };

  const coverFileOnUpload = (file: File) => {
    setCoverFile(file);
  };

  const fileOnUpload = (files: File[]) => {
    setPhotoFiles(files);
  };

  const addHike = () => {
    if (
      inputs.name === "" ||
      inputs.description === "" ||
      inputs.elevation === "" ||
      inputs.difficulty === "" ||
      inputs.duration === "" ||
      inputs.location === ""
    ) {
      alert("error");
      return;
    }

    const formData = new FormData();
    photoFiles.forEach((file) => formData.append("photoFiles", file));
    if (coverFile) {
      formData.append("coverFile", coverFile);
    }
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("location", inputs.location);
    formData.append("elevation", inputs.elevation);
    formData.append("difficulty", inputs.difficulty);
    formData.append("duration", inputs.duration);

    axiosInstance
      .post("/hike", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/hike/" + inputs.name.split(" ").join("-").toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editHike = () => {
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

    const formData = new FormData();
    photoFiles.forEach((file) => formData.append("photoFiles", file));
    if (coverFile) {
      formData.append("coverFile", coverFile);
    }
    formData.append("description", inputs.description);
    formData.append("location", inputs.location);
    formData.append("elevation", inputs.elevation);
    formData.append("difficulty", inputs.difficulty);
    formData.append("duration", inputs.duration);

    axiosInstance
      .put("/hike/" + name, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        navigate("/hike/" + inputs.name.split(" ").join("-").toLowerCase());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name) {
      addHike();
    } else {
      editHike();
    }
  };

  const deleteOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstance
      .delete("/hike/" + hikeId)
      .then((data) => {
        navigate("/hike");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (name) {
      axiosInstance
        .get("/hike/" + name)
        .then((res) => {
          const hikeDetails: HikeDetail = res.data;
          setHikeName(hikeDetails.name);
          setInputs({
            name: hikeDetails.name,
            description: hikeDetails.description,
            location: hikeDetails.location,
            elevation: hikeDetails.elevation.toString(),
            difficulty: hikeDetails.difficulty.toString(),
            duration: hikeDetails.duration.toString(),
          });
          setHikeId(hikeDetails.id);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          navigate("/addhike");
          setIsLoading(false);
        });
    } else {
      console.log("bye");
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <p>isLoading</p>
  ) : (
    <div className="max-w-screen-lg mx-auto px-5 mt-10">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl mb-6">
          {name ? "Edit" + hikeName : "Add New Hike"}
        </h1>
        {name && (
          <button className="button" onClick={deleteOnClick}>
            Delete
          </button>
        )}
      </div>

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
                value={inputs.name}
                onChange={handleChange}
              />
            }
          />
          <SectionItem
            label={<label htmlFor="description">Description</label>}
            body={
              <input
                id="description"
                className="input"
                type="text"
                placeholder="Enter description"
                name="description"
                value={inputs.description}
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
                value={inputs.elevation}
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
                value={inputs.difficulty}
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
                value={inputs.duration}
                onChange={handleChange}
              />
            }
          />

          <SectionItem
            label={<div>Location</div>}
            body={
              <Dropdown
                initialValue={inputs.location}
                options={countriesList}
                onSelected={locationOnSelect}
              />
            }
          />
          <SectionItem
            label="Upload Cover Image"
            body={
              <FileUpload
                maxFiles={1}
                onFilesSelected={(file) => {
                  coverFileOnUpload(file[0]);
                }}
              />
            }
            className="col-[1/3]"
          />
          <SectionItem
            label="Upload Images"
            body={
              <FileUpload
                maxFiles={20}
                onFilesSelected={(files) => {
                  fileOnUpload(files);
                }}
              />
            }
            className="col-[1/3]"
          />
        </div>
        <div className="flex justify-end my-6">
          <button className="button" onClick={submitOnClick}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHike;
