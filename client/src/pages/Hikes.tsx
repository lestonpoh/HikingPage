import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import Hike from "../components/Hike";
import { HikeInterface } from "../interface/HikeInterface";
import { useNavigate } from "react-router-dom";

function Hikes() {
  const { isPending, data } = useQuery<HikeInterface[]>({
    queryKey: ["hikes"],
    queryFn: () =>
      axiosInstance
        .get("/hike")
        .then((res) => {
          return res.data;
        })
        .catch(() => {}),
  });

  const navigate = useNavigate();

  const addHikeOnClick = () => {
    navigate("/addhike");
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <h1 className="my-10 text-5xl font-bold h-12">HIKES</h1>
        <div className="  flex flex-wrap gap-3">
          {isPending
            ? "Loading"
            : !data || data.length === 0
            ? "No hikes found"
            : data?.map((hike, i) => <Hike key={i} hike={hike} />)}
        </div>
      </div>
      <button
        onClick={addHikeOnClick}
        className="button fixed bottom-6 right-6"
      >
        Add Hike
      </button>
    </>
  );
}

export default Hikes;
