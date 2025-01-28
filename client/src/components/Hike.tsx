import { useNavigate } from "react-router-dom";
import { HikeInterface } from "../interface/HikeInterface";

interface Props {
  hike: HikeInterface;
}

const Hike = ({ hike }: Props) => {
  let navigate = useNavigate();
  const hikeOnClick = (name: string) => {
    navigate("/hike/" + name.split(" ").join("-").toLowerCase());
  };

  return (
    <div onClick={() => hikeOnClick(hike.name)}>
      <div className="m-2 cursor-pointer rounded  hover:shadow-md">
        <img
          className="w-64 h-64 object-cover"
          src={`${import.meta.env.VITE_SERVER_UPLOADS_URL}/${hike.fileName}`}
        />
        <div className="px-2 py-1 font-bold text-s bg-sky-200">{hike.name}</div>
        <div className="flex gap-1 text-xs px-2 py-1 bg-sky-400">
          <div className="flex-1">{hike.elevation}m</div>
          <div className="flex-1">{hike.difficulty}/10</div>
          <div className="flex-1">{hike.duration} h</div>
        </div>
      </div>
    </div>
  );
};

export default Hike;
