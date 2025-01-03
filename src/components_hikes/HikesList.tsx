import HikeItem from "./HikeItem";
import "./HikesList.css";

function HikesList() {
  const hikes = [
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
  ];

  const hikeOnClick = () => {};

  return (
    <>
      {!hikes && <p>Loading...</p>}
      {hikes.length === 0 && <p>No hikes found</p>}
      <div className="mt-4 max-w-screen-md mx-auto hikes-list">
        {hikes.map((hike) => (
          <HikeItem hikeDetails={hike} />
          // <div key={hike.id} onClick={hikeOnClick}>

          // </div>
        ))}
      </div>
    </>
  );
}

export default HikesList;
