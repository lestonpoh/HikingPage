import { Navigate, useParams } from "react-router-dom";
import { hikes } from "../hikestemp";
import { useEffect, useState } from "react";
import HikePhotoList from "./HikePhotosList";

interface Photo {
  id: number;
  url: string;
}

function HikeDetails() {
  const { name } = useParams();
  const [photos, setPhotos] = useState<Array<Photo>>([]);
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

  if (!hike) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <div></div>
      <HikePhotoList photos={photos} />
    </>
  );
}

export default HikeDetails;
