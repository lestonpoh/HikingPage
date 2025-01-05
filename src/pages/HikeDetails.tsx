import { Navigate, useParams } from "react-router-dom";
import { hikes } from "../hikestemp";
import { useEffect, useState } from "react";

interface HikeDetails {
  name: string;
  description: string;
  location: string;
  access: string;
  elevation: number;
  difficulty: number;
  duration: number;
}

interface HikePhoto {
  id: number;
  url: string;
}

function HikeDetails() {
  const { name } = useParams();
  const [photos, setPhotos] = useState<HikePhoto[]>([]);
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

  if (!hike) {
    return <Navigate to="/error" />;
  }

  return (
    <>
      <div>
        <h1>{details.name}</h1>
      </div>
      <div className="relative bg-slate-200 ">
        <div className="photos-list-label inline-block bg-blue-600 text-white font-bold px-3 py1">
          PHOTO GALLERY
        </div>
        {!photos && <p>Loading...</p>}
        <div className="max-w-screen-lg py-6 px-8 relative m-auto hike-photos-list">
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.url}></img>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HikeDetails;
