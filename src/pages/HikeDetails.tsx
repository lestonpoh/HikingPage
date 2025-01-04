import { Navigate, useParams } from "react-router-dom";
import { hikes } from "../hikestemp";
import { useEffect, useState } from "react";
import HikePhotoList, { HikePhoto } from "../components/hikes/HikePhotosList";

interface HikeDetails {
  name: string;
  description: string;
  location: string;
  access: string;
  elevation: number;
  difficulty: number;
  duration: number;
}

function HikeDetails() {
  const { name } = useParams();
  const [photos, setPhotos] = useState<Array<HikePhoto>>([]);
  const [details, setDetails] = useState<HikeDetails>({
    name: "string",
    description: "string",
    location: "string",
    access: "string",
    elevation: 1,
    difficulty: 1,
    duration: 1,
  });

  let hike = hikes.find((hike) => hike.name === name);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", { mode: "cors" })
      .then((response) => response.json())
      .then((response) =>
        setPhotos(
          response.slice(0, 30).map((element: any) => {
            return { id: element.id, url: element.url };
          })
        )
      )
      .catch((error) => console.log(error));
  }, []);

  // setDetails();
  console.log(details);

  if (!hike) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <div>
        <h1>{details.name}</h1>
      </div>
      <HikePhotoList photos={photos} />
    </>
  );
}

export default HikeDetails;
