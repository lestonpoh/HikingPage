import "./Hikes.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Hike {
  id: number;
  name: string;
  elevation: number;
  difficulty: number;
  duration: number;
}

function Hikes() {
  const [hikes, setHikes] = useState<Hike[]>([
    {
      id: 1,
      name: "Hike1",
      elevation: 1000,
      difficulty: 1,
      duration: 1,
    },
    {
      id: 2,
      name: "Hike2",
      elevation: 2000,
      difficulty: 2,
      duration: 2,
    },
    {
      id: 3,
      name: "Hike3",
      elevation: 3000,
      difficulty: 3,
      duration: 3,
    },
  ]);

  useEffect(() => {
    fetch("/api/hikes")
      .then((response) => response.json())
      .then((data) => {
        setHikes(data);
      })
      .catch((error) => {
        console.error("Error fetching hikes:", error); // Error handling
      });
  }, []);

  let navigate = useNavigate();
  const hikeOnClick = (name: string) => {
    navigate("/hikes/" + name);
  };

  return (
    <div>
      {!hikes && <p>Loading...</p>}
      {hikes.length === 0 && <p>No hikes found</p>}
      <div className="hikes-list max-w-screen-lg">
        {hikes.map((hike) => (
          <div key={hike.id} onClick={() => hikeOnClick(hike.name)}>
            <div className="hike-item m-2 cursor-pointer rounded border-solid border border-black hover:shadow-md">
              <div className="">image</div>
              <div className="px-2 py-1 font-bold text-s bg-sky-200">
                {hike.name}
              </div>
              <div className="flex gap-1 text-xs px-2 py-1 bg-sky-400">
                <div className="flex-1">{hike.elevation}m</div>
                <div className="flex-1">{hike.difficulty}/10</div>
                <div className="flex-1">{hike.duration} h</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hikes;
