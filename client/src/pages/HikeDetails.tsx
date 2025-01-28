import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import Input from "../components/Input";
import SectionItem from "../components/SectionItem";
import PostComment from "../components/comment/PostComment";
import Comments from "../components/comment/Comments";

interface HikeDetails {
  id: number;
  name: string;
  description: string;
  location: string;
  elevation: number;
  difficulty: number;
  duration: number;
  files: string[];
}

interface HikePhoto {
  id: number;
  url: string;
}

function HikeDetails() {
  const { name } = useParams();
  const [photos, setPhotos] = useState<HikePhoto[]>([]);
  const [details, setDetails] = useState<HikeDetails | null>(null);

  // let hike = hikes.find((hike) => hike.name === name);
  useEffect(() => {
    axiosInstance
      .get("/hike/" + name)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // axiosInstance
    //   .get("https://jsonplaceholder.typicode.com/photos")
    //   .then((res) =>
    //     setPhotos(
    //       res.data.slice(0, 30).map((element: any) => {
    //         return { id: element.id, url: element.url };
    //       })
    //     )
    //   )
    //   .catch((error) => console.log(error));
  }, []);

  // if (!hike) {
  //   return <Navigate to="/error" />;
  // }

  return (
    <div>
      {/* Hike descriptions */}
      {!details ? (
        "Loading"
      ) : (
        <div className="max-w-screen-lg mx-auto mt-12 px-2">
          <h1 className="font-bold text-5xl">{details.name}</h1>

          <div className=" bg-slate-200 rounded-lg py-2 px-5 my-10 mx-auto flex gap-11">
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold">{details.elevation}m</div>
              <div className="text-sm text-neutral-500">ELEVATION</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold">{details.difficulty}/10</div>
              <div className="text-sm text-neutral-500">DIFFICULTY</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold">{details.duration}h</div>
              <div className="text-sm text-neutral-500">DURATION</div>
            </div>
          </div>

          <div className="mb-14 px-5 flex flex-col gap-4">
            <div className="grid grid-cols-[auto_1fr] gap-6">
              <h1 className="font-bold">DESCRIPTION</h1>
              <p>{details.description}</p>

              <h1 className="font-bold">LOCATION</h1>
              <p>{details.location}</p>

              {/* <h1 className="font-bold">ACCESS</h1>
              <p>{details.access}</p> */}
            </div>
          </div>
        </div>
      )}

      {/* photos gallery */}
      <div className="relative bg-slate-200 ">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-block bg-blue-600 text-white font-bold px-4 py-1 text-xl">
          PHOTO GALLERY
        </div>
        {!photos && <p>Loading...</p>}
        <div className="max-w-screen-lg py-10 px-8 m-auto flex flex-wrap gap-3">
          {details?.files.map((file, i) => (
            <img
              key={i}
              className="h-48 w-40"
              src={`${import.meta.env.VITE_SERVER_UPLOADS_URL}/${file}`}
            ></img>
          ))}
        </div>
      </div>
      <Comments id={details ? details.id : -1} />
    </div>
  );
}

export default HikeDetails;
