import HikeItem from "./HikeItem";
import { hikes } from "../../hikestemp";
import { useNavigate } from "react-router-dom";

function HikesList() {
  let navigate = useNavigate();
  const hikeOnClick = (name: string) => {
    navigate("/hikes/" + name);
  };

  return (
    <>
      {!hikes && <p>Loading...</p>}
      {hikes.length === 0 && <p>No hikes found</p>}
      <div className="hikes-list max-w-screen-lg">
        {hikes.map((hike) => (
          <div key={hike.id} onClick={() => hikeOnClick(hike.name)}>
            <HikeItem hikeDetails={hike} />
          </div>
        ))}
      </div>
    </>
  );
}

export default HikesList;
