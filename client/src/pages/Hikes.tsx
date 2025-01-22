import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";
import Hike from "../components/Hike";
import { HikeInterface } from "../interface/HikeInterface";

function Hikes() {
  const { isPending, error, data } = useQuery<HikeInterface[]>({
    queryKey: ["hikes"],
    queryFn: () =>
      axiosInstance
        .get("/hike")
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
  });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="my-10 text-5xl font-bold h-12">HIKES</h1>
      <div className="  flex flex-wrap gap-3">
        {isPending
          ? "Loading"
          : data?.length === 0
          ? "No hikes found"
          : data?.map((hike) => <Hike hike={hike} />)}
      </div>
    </div>
  );
}

export default Hikes;
